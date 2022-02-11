import json
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.forms.models import model_to_dict

# assuming obj is your model instance

# Create your views here.


def login(request, *args, **kwargs):
    login_user = json.loads(request.body)
    user = authenticate(username=login_user.get('email'), password=login_user.get('password'))
    if user is None:
        return HttpResponseNotFound()
    data = model_to_dict( user )
    if 'password' in data:
        del data['password']
    return JsonResponse(data, safe=False)


def register(request, *args, **kwargs):
    new_user = json.loads(request.body)
    User.objects.create_user(
        new_user.get('email'),
        new_user.get('email'),
        new_user.get('password')
    ).save()
    
    user = User.objects.get(username=new_user.get('email'))
    data = model_to_dict( user )
    if 'password' in data:
        del data['password']
    return JsonResponse(data, safe=False)
