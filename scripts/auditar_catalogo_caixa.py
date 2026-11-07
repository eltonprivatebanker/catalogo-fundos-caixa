#!/usr/bin/env python3
"""Auditoria independente do Catálogo CAIXA — não altera dados nem o robô.
Uso: python scripts/auditar_catalogo_caixa.py --base . --saida auditorias/gerado
Requer somente Python 3.10+ (biblioteca padrão).
"""
import argparse
import csv
import json
import re
import statistics
import unicodedata
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path

META_FIELDS = ('no_benchmark','no_estrategia','no_classificacao_tributaria','de_horario_limite',
               'de_horario_resgate','de_link_pagina_fundo','de_link_lamina','de_link_regulamento')

def txt(x):
    return '' if x is None else str(x).strip()

def nval(x):
    x = txt(x)
    if x.lower() in ('', '-', '—', 'null', 'none', 'nan', 'indisponivel'):
        return None
    x = re.sub(r'[\sR$%]', '', x)
    if ',' in x:
        x = x.replace('.', '').replace(',', '.')
    try:
        v = float(x)
        return v if v == v and abs(v) != float('inf') else None
    except ValueError:
        return None

def norm(x):
    s = unicodedata.normalize('NFD', txt(x).upper())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'\s+', ' ', re.sub(r'[^A-Z0-9]+', ' ', s)).strip()

def cnpj(x):
    return re.sub(r'\D', '', txt(x))[:14]

def code(x):
    return re.sub(r'\D', '', txt(x)).lstrip('0')

def key(x):
    c = cnpj(x.get('CNPJ') or x.get('nu_cnpj'))
    if c: return 'cnpj:' + c
    k = code(x.get('codfundo') or x.get('co_siico00') or x.get('co_siico'))
    if k: return 'cod:' + k
    n = norm(x.get('Fundo') or x.get('no_fundo') or x.get('no_razao_social'))
    return 'nome:' + n if n else ''

def dtbr(x):
    try: return datetime.strptime(txt(x), '%d/%m/%Y').date()
    except ValueError: return None

def dtiso(x):
    try: return datetime.fromisoformat(txt(x).replace('Z','+00:00')).date()
    except ValueError: return None

def score(m):
    return sum(bool(txt(m.get(k))) and txt(m.get(k)).upper() not in
               ('-', '—', 'INDISPONIVEL', 'NULL', 'NONE') for k in META_FIELDS)

def indexes(metas):
    by_c, by_k, by_n = {}, {}, {}
    for m in metas:
        c = cnpj(m.get('nu_cnpj'))
        full = re.sub(r'\D','', txt(m.get('co_siico00') or m.get('co_siico')))
        short = code(full)
        for d, keys in ((by_c,[c]),(by_k,[full,short]),(by_n,[norm(m.get('no_fundo'))])):
            for k in filter(None,keys):
                if k not in d or score(m) >= score(d[k]):
                    d[k] = m
    return by_c, by_k, by_n

def lookup(r, ix):
    by_c, by_k, by_n = ix
    c = cnpj(r.get('CNPJ') or r.get('nu_cnpj'))
    if c in by_c: return by_c[c]
    full = re.sub(r'\D','', txt(r.get('codfundo') or r.get('co_siico00') or r.get('co_siico')))
    for k in (full, code(full)):
        if k and k in by_k: return by_k[k]
    return by_n.get(norm(r.get('Fundo') or r.get('no_fundo')))

def cat_meta(m):
    cls = norm(m.get('no_classificacao_cvm'))
    blob = ' '.join((cls, norm(m.get('no_fundo')), norm(m.get('no_estrategia'))))
    if 'FUNDO DE INDICE' in blob or re.search(r'\bETF\b',blob): return 'FUNDO DE INDICE'
    if 'FMP' in blob or 'MUTUOS DE PRIVATIZACAO' in blob: return 'FUNDOS MUTUOS DE PRIVATIZACAO'
    for c in ('ACOES','CAMBIAL','MULTIMERCADO'):
        if c in cls: return c
    if 'RENDA FIXA' in cls:
        if 'SIMPLES' in blob: return 'RENDA FIXA SIMPLES'
        if 'CURTO PRAZO' in blob: return 'RENDA FIXA CURTO PRAZO'
        if 'REFERENCIADO' in blob or re.search(r'\bREF\b',norm(m.get('no_estrategia'))):
            return 'RENDA FIXA REFERENCIADO'
        return 'RENDA FIXA'
    return cls or 'OUTROS'

def audit(rows, meta):
    ix = indexes(meta)
    known = set()
    for r in rows:
        if key(r): known.add(key(r))
        linked = lookup(r, ix)
        if linked and key(linked): known.add(key(linked))
    ref = Counter(dtbr(r.get('Data Rentabilidade Ref')) for r in rows).most_common(1)[0][0]
    if not ref: raise ValueError('Data Rentabilidade Ref não disponível')
    cutoff = ref.replace(year=ref.year-1)
    out = []
    for r in rows:
        out.append(dict(origem='CSV',fundo=r['Fundo'],categoria=r['Categoria'],
            cnpj=cnpj(r.get('CNPJ')),codigo=code(r.get('codfundo')),
            inicio=dtbr(r.get('Data Inicio')),ref_retorno=dtbr(r.get('Data Rentabilidade Ref')),
            ref_pl=None,pl_mm=nval(r.get('PL (milhoes R$)')),
            retorno_12m_pct=nval(r.get('Acum. 12M (%)'))))
    for m in meta:
        if m.get('ic_flag_exibir_portfolio') in (0,False): continue
        k = key(m)
        if not k or k in known: continue
        known.add(k)
        pl = nval(m.get('vr_pl'))
        out.append(dict(origem='CADASTRO',fundo=txt(m.get('no_fundo') or m.get('no_razao_social')),
            categoria=cat_meta(m),cnpj=cnpj(m.get('nu_cnpj')),
            codigo=code(m.get('co_siico00') or m.get('co_siico')),
            inicio=dtiso(m.get('dt_inicial')),ref_retorno=None,ref_pl=dtiso(m.get('dt_cota_atual')),
            pl_mm=pl/1e6 if pl is not None else None,retorno_12m_pct=None))
    duplicates_c = Counter(r['cnpj'] for r in out if r['origem']=='CSV' and r['cnpj'])
    duplicates_k = Counter(r['codigo'] for r in out if r['origem']=='CSV' and r['codigo'])
    for r in out:
        issues = []
        if r['origem']=='CADASTRO': issues.append('SEM_RETORNO_12M_OPERACIONAL')
        if r['pl_mm'] is None or r['pl_mm']<=0: issues.append('SEM_PL_VALIDO')
        if r['retorno_12m_pct'] is None: issues.append('SEM_RETORNO_12M')
        if r['origem']=='CSV':
            if not r['cnpj'] and not r['codigo']: issues.append('IDENTIFICADOR_AUSENTE')
            if r['cnpj'] and duplicates_c[r['cnpj']]>1: issues.append('CNPJ_REPETIDO')
            if r['codigo'] and duplicates_k[r['codigo']]>1: issues.append('CODIGO_REPETIDO')
            if r['ref_retorno']!=ref: issues.append('REFERENCIA_RETORNO_DIVERGENTE')
            if r['inicio'] is None: issues.append('DATA_INICIO_AUSENTE')
            elif r['inicio']>cutoff: issues.append('HISTORICO_12M_INCOMPLETO')
        r['problemas']=issues
        r['elegivel_preliminar']=r['origem']=='CSV' and not issues
        r['status']='ELEGIVEL_PRELIMINAR' if r['elegivel_preliminar'] else 'REVISAR' if r['origem']=='CSV' and r['retorno_12m_pct'] is not None else 'SEM_DADOS_12M'
    return out, ref

def summary(rows, ref):
    all_cats=defaultdict(list)
    for r in rows: all_cats[r['categoria']].append(r)
    categories=[]
    for name, items in sorted(all_cats.items()):
        raw=[r for r in items if r['origem']=='CSV' and r['pl_mm'] is not None and r['pl_mm']>0 and r['retorno_12m_pct'] is not None]
        eligible=[r for r in items if r['elegivel_preliminar']]
        pl_raw=sum(r['pl_mm'] for r in raw)
        pl_ok=sum(r['pl_mm'] for r in eligible)
        ret=[r['retorno_12m_pct'] for r in eligible]
        weighted=sum(r['pl_mm']*r['retorno_12m_pct'] for r in eligible)/pl_ok if pl_ok else None
        categories.append(dict(categoria=name,fundos_catalogo=len(items),fundos_com_dados=len(raw),
            fundos_elegiveis=len(eligible),pl_bruto_mm=round(pl_raw,3),pl_elegivel_mm=round(pl_ok,3),
            cobertura_pl_pct=round(100*pl_ok/pl_raw,2) if pl_raw else None,
            retorno_12m_ponderado_filtrado_pct=round(weighted,4) if weighted is not None else None,
            media_simples_filtrada_pct=round(statistics.mean(ret),4) if ret else None,
            mediana_filtrada_pct=round(statistics.median(ret),4) if ret else None))
    valid=[r for r in rows if r['origem']=='CSV' and r['pl_mm'] is not None and r['pl_mm']>0 and r['retorno_12m_pct'] is not None]
    eleg=[r for r in rows if r['elegivel_preliminar']]
    return dict(data_ref_retorno=ref.isoformat(),universo=len(rows),operacionais=sum(r['origem']=='CSV' for r in rows),
        cadastro_adicional=sum(r['origem']=='CADASTRO' for r in rows),com_pl_retorno=len(valid),
        elegiveis=len(eleg),pl_bruto_mm=round(sum(r['pl_mm'] for r in valid),3),
        pl_elegivel_mm=round(sum(r['pl_mm'] for r in eleg),3),
        problemas=dict(Counter(p for r in rows for p in r['problemas'])),categorias=categories,
        ressalvas=['PL CSV sem data independente confirmada','PL ponderado é fotografia, não retorno histórico',
        'FI/FIC sem desduplicação de patrimônio','Identidades ambíguas excluídas no cenário conservador'])

def write_csv(path, rows, columns):
    with path.open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,columns,delimiter=';',extrasaction='ignore')
        w.writeheader()
        for r in rows:
            z={k:(v.isoformat() if hasattr(v,'isoformat') else v) for k,v in r.items() if k!='problemas'}
            z['motivos']=' | '.join(r.get('problemas',[]))
            w.writerow(z)

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--base',type=Path,default=Path(__file__).resolve().parent.parent)
    p.add_argument('--saida',type=Path,default=Path.cwd()/'auditoria_gerada')
    a=p.parse_args()
    with (a.base/'dados_atuais.csv').open(encoding='utf-8-sig',newline='') as f: rows=list(csv.DictReader(f))
    meta=json.loads((a.base/'fundos.json').read_text(encoding='utf-8'))
    if not isinstance(meta,list): raise ValueError('fundos.json deve ser lista')
    out,ref=audit(rows,meta)
    info=summary(out,ref)
    a.saida.mkdir(parents=True,exist_ok=True)
    cols=['origem','fundo','categoria','cnpj','codigo','inicio','ref_retorno','ref_pl','pl_mm',
          'retorno_12m_pct','status','elegivel_preliminar','motivos']
    write_csv(a.saida/'diagnostico_225_fundos.csv',out,cols)
    write_csv(a.saida/'inconsistencias_fundos.csv',[r for r in out if r['problemas']],cols)
    catcols=list(info['categorias'][0].keys()) if info['categorias'] else []
    if catcols: write_csv(a.saida/'categorias_preliminares.csv',info['categorias'],catcols)
    (a.saida/'resumo_auditoria.json').write_text(json.dumps(info,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({k:info[k] for k in ('universo','operacionais','cadastro_adicional','elegiveis','pl_bruto_mm','pl_elegivel_mm')},ensure_ascii=False,indent=2))

if __name__=='__main__':
    main()
