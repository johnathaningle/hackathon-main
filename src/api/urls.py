from django.urls import path
from . import views as api_views

urlpatterns = [
    path('connections/', api_views.connectionList, name='connections'),
]