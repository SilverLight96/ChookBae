from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.http import Http404
from django.shortcuts import render
from .models import User, Point, Venue, Team, Match, Player, PlayerCard, Prediction, Bet, EmailCert

# Create your views here.

# 승부 예측 POST 
class matchpredict(APIView):
    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['match_pk', 'point', 'predict'],
    properties={
        'match_pk': openapi.Schema(type=openapi.TYPE_NUMBER, description="경기 번호"),
        'point': openapi.Schema(type=openapi.TYPE_NUMBER, description="배팅 포인트"),
        'predict': openapi.Schema(type=openapi.TYPE_NUMBER, description="승부 예측"),
        })

    def get_object(self, id):
        try:
            user=User.objects.get(id=1)
            match_num=Bet.objects.get(id=match_pk)

            if match_num is None:
                bet=Bet.objects.create(match=Match.objects.get(id=match_pk), win=0, draw=0, lose=0)

            
            bet=Bet.objects.get(match=Match.objects.get(id=1))
            if(predict==0):
                bet.win+=point
            elif(predict==1):
                bet.draw+=upoint
            else: 
                bet.lose+=point

            bet.save()

        except User.DoesNotExist:
            raise Http404 

    @swagger_auto_schema(operation_id="승부 예측", operation_description="승부 예측하기", request_body=param)
    def post(self, request, format=None):
        ingredient = self.get_object(request.user)
        return Response('success')
