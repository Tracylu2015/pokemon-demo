from django.urls import path

from .views import pokemon, user

urlpatterns = [
    path('pokemon', pokemon.search, name='search'),
    path('pokemon/search', pokemon.search_pokemon, name='search_pokemon'),
    path('pokemon/add_fav', pokemon.add_favorite_pokemon, name='add_fav'),
    path('pokemon/get_fav/<int:user_id>', pokemon.get_user_favorite_pokemon, name='get_fav'),
    path('pokemon/remove_fav', pokemon.remove_user_favorite_pokemon, name='remove_fav'),
    path('user/login', user.login, name='user_login'),
    path('user/register', user.register, name='user_register'),
]