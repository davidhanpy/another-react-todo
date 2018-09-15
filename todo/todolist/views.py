from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from . import models
from django.views import View
from django.forms.models import model_to_dict
import json
def index(request):
    return HttpResponse("welcome")
# Create your views here.

#클래스뷰
#모델뷰

class Havetodo(View):
    def get(self, request, id):
        Listdict = []
        TodoList = models.Havetodo.objects.filter(pk=id)
        for i in TodoList:
            Listdict.append(model_to_dict(i))
        TodoJson = json.dumps(Listdict,ensure_ascii=False)
        return JsonResponse(TodoJson, safe=False)
    def post(self, request):
        # ajax post방식으로 data를 넘겨줄떄 data속에 text를 받아서 새로운 데이터 생성함 
        Newdict = []
        id = models.Havetodo.objects.all().count() + 1
        text = request.POST['text']
        NewList = models.Havetodo.create(pk=id, text=text, checked=False)
        for i in NewList:
            Newdict.append(model_to_dict(i))
        NewJson = json.dumps(Newdict,ensure_ascii=False)
        return JsonResponse(NewJson, safe=False)
    def delete(self,request,id):
        Deletelist = models.Havetodo.objects.filter(pk=id)
        Deletelist.delete()
        return JsonResponse({'error':0})