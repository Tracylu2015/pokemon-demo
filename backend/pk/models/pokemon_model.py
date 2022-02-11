from django.db import models


class Pokemon(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30)
    weight = models.IntegerField()
    exp = models.IntegerField()
    image = models.CharField(max_length=120, default="")
