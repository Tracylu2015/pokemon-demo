import json
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.views import View

from backend.pk.models import UserFavorite

# Create your views here.


def login(request, *args, **kwargs):
    login_user = json.loads(request.body)
    user = authenticate(username=login_user.get('email'), password=login_user.get('password')) 
    return HttpResponse(user)


def register(request, *args, **kwargs):
    new_user = json.loads(request.body)
    User.objects.create_user(
        new_user.get('email'),
        new_user.get('email'),
        new_user.get('password')
    ).save()
    
    user = User.objects.get(username=new_user.get('email'))
    return HttpResponse(user)
