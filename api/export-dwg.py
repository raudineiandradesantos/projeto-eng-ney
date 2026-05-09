import json
import os
import shutil
import subprocess
import tempfile
from datetime import datetime


def _safe_float(v, default=0.0):
    try:
        return float(v)
    except Exception:
        return default


def _safe_name(s):
    s = (s or 'projeto').strip().lower()
    out = ''.join(ch if ch.isalnum() or ch in '_-' else '_' for ch in s)
    return out or 'projeto'


def _build_dxf_content(data):
    name = data.get('name', 'Projeto SmartHVAC')
    date = data.get('date', datetime.utcnow().strftime('%d/%m/%Y'))
    rows = data.get('rows', []) or []

    dxf = f"999\nSmartHVAC {name} ({date})\n"
    dxf += '0\nSECTION\n2\nHEADER\n9\n$ACADVER\n1\nAC1021\n9\n$INSUNITS\n70\n4\n0\nENDSEC\n'
    dxf += '0\nSECTION\n2\nTABLES\n0\nTABLE\n2\nLAYER\n70\n4\n'
    dxf += '0\nLAYER\n2\nAMBIENTES\n70\n0\n62\n7\n6\nCONTINUOUS\n'
    dxf += '0\nLAYER\n2\nVRF-EQUIP\n70\n0\n62\n4\n6\nCONTINUOUS\n'
    dxf += '0\nLAYER\n2\nTEXTOS\n70\n0\n62\n3\n6\nCONTINUOUS\n'
    dxf += '0\nLAYER\n2\nDUTOS\n70\n0\n62\n5\n6\nCONTINUOUS\n'
    dxf += '0\nENDTAB\n0\nENDSEC\n'
    dxf += '0\nSECTION\n2\nENTITIES\n'

    x = 0.0
    y = 0.0
    max_row_h = 0.0
    col = 0
    cols = 5
    gap = 2.0

    for r in rows:
        area = max(3.0, (_safe_float(r.get('area', 9.0)) ** 0.5))
        kw = _safe_float(r.get('kw', 0.0))
        room_name = ''.join(ch for ch in str(r.get('name', 'Ambiente')) if 32 <= ord(ch) <= 126)
        if col >= cols:
            col = 0
            x = 0.0
            y -= max_row_h + gap
            max_row_h = 0.0

        x1, y1, x2, y2 = x, y, x + area, y - area
        dxf += '0\nLWPOLYLINE\n8\nAMBIENTES\n90\n4\n70\n1\n'
        dxf += f'10\n{x1}\n20\n{y1}\n10\n{x2}\n20\n{y1}\n10\n{x2}\n20\n{y2}\n10\n{x1}\n20\n{y2}\n'
        dxf += f'0\nTEXT\n8\nTEXTOS\n10\n{x1+0.3}\n20\n{y1-0.6}\n40\n0.4\n1\n{room_name}\n'
        dxf += f'0\nTEXT\n8\nTEXTOS\n10\n{x1+0.3}\n20\n{y1-1.2}\n40\n0.3\n1\n{kw:.2f} kW\n'
        cx, cy = x1 + area / 2.0, y1 - area / 2.0
        dxf += f'0\nCIRCLE\n8\nVRF-EQUIP\n10\n{cx}\n20\n{cy}\n40\n0.6\n'
        dxf += f'0\nTEXT\n8\nVRF-EQUIP\n10\n{cx-0.5}\n20\n{cy-0.15}\n40\n0.25\n1\nVRF\n'

        x += area + gap
        max_row_h = max(max_row_h, area)
        col += 1

    dxf += '0\nENDSEC\n0\nEOF\n'
    return dxf


def _find_oda_binary():
    env_bin = os.getenv('ODA_FILE_CONVERTER')
    if env_bin and shutil.which(env_bin):
        return shutil.which(env_bin)
    for candidate in ['ODAFileConverter', 'odafc', 'ODAFileConverter.exe']:
        found = shutil.which(candidate)
        if found:
            return found
    return None


def handler(request, response):
    if request.method != 'POST':
        response.status_code = 405
        return response.send('Method not allowed')

    try:
        payload = request.json() or {}
    except Exception:
        response.status_code = 400
        return response.json({'ok': False, 'message': 'Payload inválido'})

    oda_bin = _find_oda_binary()
    if not oda_bin:
        response.status_code = 501
        return response.json({
            'ok': False,
            'message': 'Conversor DWG não encontrado. Instale o ODA File Converter (gratuito) e configure ODA_FILE_CONVERTER no deploy.'
        })

    try:
        safe_name = _safe_name(payload.get('name'))
        with tempfile.TemporaryDirectory() as tmp:
            in_dir = os.path.join(tmp, 'in')
            out_dir = os.path.join(tmp, 'out')
            os.makedirs(in_dir, exist_ok=True)
            os.makedirs(out_dir, exist_ok=True)

            dxf_path = os.path.join(in_dir, f'{safe_name}.dxf')
            with open(dxf_path, 'w', encoding='utf-8') as f:
                f.write(_build_dxf_content(payload))

            # ODA CLI: <in_folder> <out_folder> <in_ver> <out_ver> <file_type> <recurse> <audit>
            cmd = [oda_bin, in_dir, out_dir, 'ACAD2018', 'ACAD2018', 'DWG', '0', '1']
            proc = subprocess.run(cmd, capture_output=True, text=True, timeout=45)
            if proc.returncode != 0:
                response.status_code = 500
                return response.json({'ok': False, 'message': 'Falha na conversão DWG', 'detail': (proc.stderr or proc.stdout or '').strip()[:500]})

            dwg_path = os.path.join(out_dir, f'{safe_name}.dwg')
            if not os.path.exists(dwg_path):
                files = [x for x in os.listdir(out_dir) if x.lower().endswith('.dwg')]
                if files:
                    dwg_path = os.path.join(out_dir, files[0])
                else:
                    response.status_code = 500
                    return response.json({'ok': False, 'message': 'Conversão executada, mas DWG não foi gerado'})

            with open(dwg_path, 'rb') as f:
                data = f.read()

        response.status_code = 200
        response.headers['Content-Type'] = 'application/acad'
        response.headers['Content-Disposition'] = f'attachment; filename="{safe_name}.dwg"'
        return response.send(data)
    except subprocess.TimeoutExpired:
        response.status_code = 504
        return response.json({'ok': False, 'message': 'Tempo limite na conversão DWG'})
    except Exception as exc:
        response.status_code = 500
        return response.json({'ok': False, 'message': f'Erro inesperado: {exc}'})
