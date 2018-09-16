from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from . import models    
from django.views import View
from django.forms.models import model_to_dict
import json

class Havetodo(View):
    def get(self, request):
        Listdict = []
        requestedId = request.GET.get('id', None)
        text = request.GET.get('text', None)
        if text is not None:
            TodoList = models.Havetodo.objects.filter(text__icontains = 'AJA')
            for i in TodoList:
                Listdict.append(model_to_dict(i))
        elif requestedId is None:
            TodoList = models.Havetodo.objects.all()
            for i in TodoList:
                Listdict.append(model_to_dict(i))
        else:
            Listdict = models.Havetodo.objects.get(pk=requestedId)
        return JsonResponse(Listdict, safe=False)

    def put(self, request):
        # ajax put방식으로 data를 넘겨줄떄 data속에 text를 받아서 새로운 데이터 생성함 
        Newdict = []
        id = models.Havetodo.objects.all().count() + 1
        text = request.POST['text']
        NewList = models.Havetodo.create(pk=id, text=text, checked=False)
        Listdict = []
        TodoList = models.Havetodo.objects.all()
        for i in TodoList:
            Listdict.append(model_to_dict(i))
        TodoJson = json.dumps(Listdict,ensure_ascii=False)
        return JsonResponse(TodoJson, safe=False)
    def delete(self,request,id):
        Deletelist = models.Havetodo.objects.filter(pk=id)
        Deletelist.delete()
        return JsonResponse()