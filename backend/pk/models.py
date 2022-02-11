from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UserFavorite(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    favorite_pk_id = models.IntegerField()

class UserNote(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    notes = models.TextField()
