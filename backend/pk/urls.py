from django.urls import path

from .views import pokemon, user

urlpatterns = [
    path('pokemon', pokemon.search, name='search'),
    path('user/login', user.login, name='login'),
]