from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import viewsets
import requests
from django.core.cache import cache

# Create your views here.

PK_URL = "https://pokeapi.co/api/v2/pokemon?limit={limit}&offset={offset}"


def search(request):
    page = int(request.GET.get('page', 0))
    limit = int(request.GET.get('limit', 10))
    offset = page * limit
    resp = requests.get(
        PK_URL.format(limit=limit, offset=offset)
    )
    resp.raise_for_status()
    main_resp = resp.json()
    results = main_resp.get('results')

    respResult = {
        'data': []
    }
    for r in results:
        data = {
            'name': r.get('name')
        }
        try:
            url = r.get('url')
            if not url:
                continue
            pk_data = cache.get(url)
            if not pk_data:
                pk_resp = requests.get(url)
                pk_data = pk_resp.json()
                cache.set(url, pk_data, timeout=3600)

            pk_image = pk_data.get('sprites', {}).get('other', {}).get(
                'official-artwork', {}).get('front_default')
            data['image'] = pk_image
            data['id'] = pk_data.get('id')
            data['exp'] = pk_data.get('base_experience')
            data['weight'] = pk_data.get('weight')
        except Exception:
            continue
        respResult['data'].append(data)

    respResult['size'] = len(respResult['data'])
    respResult['maxPage'] = main_resp.get('count', 1126) // limit
    return JsonResponse(respResult, safe=False)
