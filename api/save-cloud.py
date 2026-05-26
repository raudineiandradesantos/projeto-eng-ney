import base64
import json
import os
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone

GRAPH_BASE = 'https://graph.microsoft.com/v1.0'


def _send_json(response, status, payload):
    try:
        response.status(status).json(payload)
    except Exception:
        response.status(status).send(json.dumps(payload))


def _read_body(request):
    body = getattr(request, 'body', None)
    if isinstance(body, dict):
        return body
    if isinstance(body, str):
        return json.loads(body or '{}')
    if isinstance(body, bytes):
        return json.loads(body.decode('utf-8') or '{}')
    return {}


def _get_access_token(tenant_id, client_id, client_secret):
    token_url = f'https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token'
    data = urllib.parse.urlencode({
        'client_id': client_id,
        'client_secret': client_secret,
        'scope': 'https://graph.microsoft.com/.default',
        'grant_type': 'client_credentials',
    }).encode('utf-8')
    req = urllib.request.Request(token_url, data=data, method='POST')
    req.add_header('Content-Type', 'application/x-www-form-urlencoded')
    with urllib.request.urlopen(req, timeout=25) as resp:
        payload = json.loads(resp.read().decode('utf-8'))
    return payload.get('access_token')


def _graph_put_json(token, url, payload):
    data = json.dumps(payload, ensure_ascii=False).encode('utf-8')
    req = urllib.request.Request(url, data=data, method='PUT')
    req.add_header('Authorization', f'Bearer {token}')
    req.add_header('Content-Type', 'application/json; charset=utf-8')
    with urllib.request.urlopen(req, timeout=40) as resp:
        return json.loads(resp.read().decode('utf-8'))


def _graph_put_binary(token, url, payload, content_type='application/octet-stream'):
    req = urllib.request.Request(url, data=payload, method='PUT')
    req.add_header('Authorization', f'Bearer {token}')
    req.add_header('Content-Type', content_type)
    with urllib.request.urlopen(req, timeout=55) as resp:
        return json.loads(resp.read().decode('utf-8'))


def _driver_root(drive_id=None, user_id=None):
    if drive_id:
        return f'{GRAPH_BASE}/drives/{drive_id}'
    if user_id:
        return f'{GRAPH_BASE}/users/{user_id}/drive'
    return f'{GRAPH_BASE}/me/drive'


def _safe_part(name):
    cleaned = ''.join(ch for ch in (name or '') if ch.isalnum() or ch in ('-', '_', '.', ' ')).strip()
    return cleaned or 'projeto'


def _decode_data_url(data_url):
    if not isinstance(data_url, str) or ';base64,' not in data_url:
        return None
    try:
        head, b64 = data_url.split(';base64,', 1)
        mime = head.split(':', 1)[1] if ':' in head else 'application/octet-stream'
        return mime, base64.b64decode(b64)
    except Exception:
        return None


def handler(request, response):
    if request.method == 'OPTIONS':
        response.status(204).send('')
        return
    if request.method != 'POST':
        _send_json(response, 405, {'ok': False, 'message': 'Use POST'})
        return

    tenant_id = os.getenv('MS_TENANT_ID', '').strip()
    client_id = os.getenv('MS_CLIENT_ID', '').strip()
    client_secret = os.getenv('MS_CLIENT_SECRET', '').strip()
    drive_id = os.getenv('MS_ONEDRIVE_DRIVE_ID', '').strip()
    user_id = os.getenv('MS_ONEDRIVE_USER_ID', '').strip()
    default_folder = os.getenv('MS_ONEDRIVE_FOLDER', '/SmartHVAC/Projetos').strip() or '/SmartHVAC/Projetos'

    if not (tenant_id and client_id and client_secret):
        _send_json(response, 501, {
            'ok': False,
            'message': 'Cloud real não configurado no servidor. Defina MS_TENANT_ID, MS_CLIENT_ID e MS_CLIENT_SECRET.'
        })
        return

    try:
        body = _read_body(request)
    except Exception:
        _send_json(response, 400, {'ok': False, 'message': 'JSON inválido.'})
        return

    project = body.get('project') or {}
    cloud = body.get('cloud') or {}

    project_name = _safe_part(project.get('name') or 'projeto')
    version = _safe_part(project.get('version') or 'v01')
    folder = (cloud.get('oneDriveFolder') or default_folder).strip() or default_folder
    folder = '/' + folder.strip('/ ')

    ts = datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S')
    json_name = f'{project_name}-{version}-{ts}.json'

    snapshot = {
        'savedAt': datetime.now(timezone.utc).isoformat(),
        'project': project,
        'cloud': cloud,
    }

    try:
        token = _get_access_token(tenant_id, client_id, client_secret)
        if not token:
            raise RuntimeError('Token de acesso não retornado.')

        root = _driver_root(drive_id=drive_id, user_id=user_id)
        json_url = f"{root}/root:{folder}/{urllib.parse.quote(json_name)}:/content"
        uploaded_json = _graph_put_json(token, json_url, snapshot)

        uploaded_pdf_meta = None
        pdf_data_url = project.get('pdfDataUrl')
        pdf_name = _safe_part(project.get('pdfName') or f'{project_name}.pdf')
        decoded = _decode_data_url(pdf_data_url)
        if decoded:
            mime, payload = decoded
            pdf_url = f"{root}/root:{folder}/{urllib.parse.quote(pdf_name)}:/content"
            uploaded_pdf_meta = _graph_put_binary(token, pdf_url, payload, content_type=mime or 'application/pdf')

        _send_json(response, 200, {
            'ok': True,
            'provider': 'OneDrive',
            'folder': folder,
            'jsonFile': {
                'name': uploaded_json.get('name'),
                'id': uploaded_json.get('id'),
                'webUrl': uploaded_json.get('webUrl')
            },
            'pdfFile': None if not uploaded_pdf_meta else {
                'name': uploaded_pdf_meta.get('name'),
                'id': uploaded_pdf_meta.get('id'),
                'webUrl': uploaded_pdf_meta.get('webUrl')
            }
        })
    except urllib.error.HTTPError as e:
        detail = e.read().decode('utf-8', errors='ignore')
        _send_json(response, 502, {'ok': False, 'message': 'Falha ao salvar no OneDrive.', 'detail': detail[:800]})
    except Exception as e:
        _send_json(response, 500, {'ok': False, 'message': f'Erro ao salvar no cloud: {e}'})
