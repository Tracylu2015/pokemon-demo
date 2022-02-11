import json
from django.http import JsonResponse, HttpResponse
import requests
from django.core.cache import cache
from django.contrib.auth.models import User

from pk.models.pokemon_model import Pokemon
from pk.models.user_model import UserFavorite
from django.core.exceptions import ObjectDoesNotExist

# Create your views here.

PK_URL = 'https://pokeapi.co/api/v2/pokemon?limit={limit}&offset={offset}'
PK_DETAIL_URL = 'https://pokeapi.co/api/v2/pokemon/{pokemon_id}'


def get_pokemon(url):
    data = {}
    pk_data = cache.get(url)
    if not pk_data:
        pk_resp = requests.get(url)
        pk_data = pk_resp.json()
        pk_image = pk_data.get('sprites', {}).get('other', {}).get(
            'official-artwork', {}).get('front_default')
        data['image'] = pk_image
        data['name'] = pk_data.get('name')
        data['id'] = pk_data.get('id')
        data['exp'] = pk_data.get('base_experience')
        data['weight'] = pk_data.get('weight')
        cache.set(url, data, timeout=3600)
        return data
    else:
        return pk_data


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
        try:
            url = r.get('url')
            if not url:
                continue
            data = get_pokemon(url)
            respResult['data'].append(data)
        except Exception:
            continue

    respResult['size'] = len(respResult['data'])
    respResult['maxPage'] = main_resp.get('count', 1126) // limit
    return JsonResponse(respResult, safe=False)


def add_favorite_pokemon(request):
    fav_body = json.loads(request.body)
    pokemon_id = fav_body.get('pokemon_id')

    # Check if pokemon exists in database
    try:
        pokemon = Pokemon.objects.get(id=pokemon_id)
    except ObjectDoesNotExist:
        # Fetch and save pokemon if does not exist in database
        url = PK_DETAIL_URL.format(pokemon_id=pokemon_id)
        data = get_pokemon(url)
        print(data)
        pokemon = Pokemon.objects.create(
            **data
        )
        pokemon.save()

    # Create UserFavorite obj from user and pokemon
    user = User.objects.get(id=fav_body.get('user_id'))
    UserFavorite.objects.create(
        user=user,
        pokemon=pokemon
    ).save()
    return HttpResponse()


def remove_user_favorite_pokemon(request):
    print(request.user)
    return HttpResponse()


def get_user_favorite_pokemon(request, user_id):
    user = User.objects.get(id=user_id)
    user_favs = UserFavorite.objects.filter(
        user=user
    )
    data = []
    for fav in user_favs:
        data.append(fav.id)
    # pokemon_id = fav_body.get('pokemon_id')
    # UserFavorite.objects.create_user_favorite(
    #     user_id = fav_body.get('user_id'),
    #     favorite_pk_id = pokemon_id
    # ).save()
    return JsonResponse(data, safe=False)
