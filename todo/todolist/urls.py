from django.urls import path
from . import views

urlpatterns = [
    path('todo/', views.Havetodo.as_view()),
]