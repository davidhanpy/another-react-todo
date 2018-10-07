from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from . import views

urlpatterns = [
    path('todo/', csrf_exempt(views.Havetodo.as_view())),
]