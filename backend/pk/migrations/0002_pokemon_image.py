# Generated by Django 4.0.2 on 2022-02-11 06:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pk', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pokemon',
            name='image',
            field=models.CharField(default='', max_length=120),
        ),
    ]