from django.urls import path

from . import views

urlpatterns = [
    path('pokemon', views.search, name='search'),
]