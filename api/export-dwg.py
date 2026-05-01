import json


def handler(request, response):
    if request.method != "POST":
        response.status_code = 405
        return response.send("Method not allowed")

    response.status_code = 501
    return response.json({
        "ok": False,
        "message": "Conversor DWG real não configurado no backend. Use DXF temporariamente."
    })
