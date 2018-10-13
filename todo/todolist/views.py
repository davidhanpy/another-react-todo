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
            TodoList = models.Havetodo.objects.filter(text__icontains = text)
            for i in TodoList:
                Listdict.append(model_to_dict(i))
        elif requestedId is None:
            TodoList = models.Havetodo.objects.all()
            for i in TodoList:
                Listdict.append(model_to_dict(i))
        else:
            Listdict = models.Havetodo.objects.get(pk=requestedId)
        return JsonResponse(Listdict, safe=False)

    def post(self, request):
        # ajax post방식으로 data를 넘겨줄떄 data속에 text를 받아서 새로운 데이터 생성함
        text = json.loads(request.body)
        print(text['text'])
        NewList = models.Havetodo(text=text['text'], checked=False)
        NewList.save()
        return JsonResponse({'error':None}, safe=False)
    def delete(self,request):
        requestedId = request.GET.get('id', None)
        Deletelist = models.Havetodo.objects.get(pk=requestedId)
        Deletelist.delete()
        return JsonResponse({'error':None})
    def put(self, request):
        requestedId = request.GET.get('id',None)
        Updatelist = models.Havetodo.objects.get(pk=requestedId)
        Updatelist.checked = True
        Updatelist.save()
        return JsonResponse({'error':None})

