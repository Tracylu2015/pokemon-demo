from django.urls import path

from .views import pokemon, user

urlpatterns = [
    path('pokemon', pokemon.search, name='search'),
    path('user/login', user.login, name='user_login'),
    path('user/register', user.register, name='user_register'),
]