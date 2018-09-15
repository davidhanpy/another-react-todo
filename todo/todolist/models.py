from django.db import models

# Create your models here.
#id={id} : pk로 쓰면 된다.
#text={title} : 30자 제한 charfield
#checked={completed} : boolean타입
#마감시간추가? : 나중에 추가해보자..

class Havetodo(models.Model):
    text = models.CharField(max_length=30)
    checked = models.BooleanField(default=False)
    def __str__(self):
        return self.text