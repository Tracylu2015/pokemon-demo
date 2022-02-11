from django.db import models
from django.contrib.auth.models import User

from pk.models.pokemon_model import Pokemon

# Create your models here.

class UserFavorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pokemon = models.ForeignKey(Pokemon, on_delete=models.CASCADE)

class UserNote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    notes = models.TextField()
