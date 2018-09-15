from django.urls import path
from . import views

urlpatterns = [
    path('',views.index, name='index'),
    path('todo/<id>', views.Havetodo.as_view()),
    path('todo/<id>/<text>', views.Havetodo.as_view()),
]