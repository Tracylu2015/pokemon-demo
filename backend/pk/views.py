from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import viewsets
import requests
# from .serializers import TodoSerializer
# from .models import Todo

# Create your views here.

PK_URL = "https://pokeapi.co/api/v2/pokemon?limit={limit}&offset={offset}"

def search(request, offset=0, limit=20):
    resp = requests.get(
        PK_URL.format(limit=limit, offset=offset)
    )
    resp.raise_for_status()
    results = resp.json().get('results')

    respResult = {
        'data': []
    }
    for r in results:
        data = {
            'name': r.get('name')
        }
        try:
            url = r.get('url')
            if url:
                pk_resp = requests.get(url)
                pk_data = pk_resp.json()
                pk_exp = pk_data.get('base_experience')
                pk_image = pk_data.get('sprites', {}).get('other', {}).get('official-artwork', {}).get('front_default')
                pk_weight = pk_data.get('weight')
                data['exp'] = pk_exp
                data['image'] = pk_image
                data['weight'] = pk_weight
        except Exception:
            continue
        respResult['data'].append(data)

    respResult['size'] = len(respResult['data'])
    respResult['offset'] = offset + len(respResult['data'])
    return JsonResponse(respResult, safe=False)
