from django.test import TestCase
from pk.views import pokemon

class PokemonTestClass(TestCase):
  
    def test_get_pokemon(self):
        data = pokemon.get_pokemon('https://pokeapi.co/api/v2/pokemon/1')
        self.assertEqual(data['name'], '')
