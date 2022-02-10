from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=30)
    email = models.CharField(max_length=60)
    password = models.CharField(max_length=60)

class UserFavorite(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    favorite_pk_id = models.IntegerField()

class UserNote(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    notes = models.TextField()
