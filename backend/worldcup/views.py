from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.http import Http404
import datetime
import operator
from django.db import transaction
from django.shortcuts import render
from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from .Serializers import CardSerializer,UserrankSerializer,goalrankSerializer
from .models import User, Point, Venue, Team, Match, Player, PlayerCard, Prediction, Bet, EmailCert
from .translation import venue_k, team_k, player_k, player_pos
import pandas as pd
from chookbae.settings import SECRET_KEY


# Create your views here.

# 승부 예측 POST
 
class matchpredict(APIView):
    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['match_pk', 'point', 'predict'],
    properties={
        'match_pk': openapi.Schema(type=openapi.TYPE_NUMBER, description="경기 번호"),
        'point': openapi.Schema(type=openapi.TYPE_NUMBER, description="배팅 포인트"),
        'predict': openapi.Schema(type=openapi.TYPE_NUMBER, description="승부 예측"),
        })

    @transaction.atomic()
    def get_object(self,user_id, match_pk, point, predict):

        today=datetime.datetime.now()+datetime.timedelta(minutes=5)

        
        if Match.objects.filter(Q(id=match_pk) &Q(start_date=today.date(), start_time__lte=today.time())) :
            return ('예측 가능한 시간이 초과되었습니다.')

        match=Match.objects.get(id=match_pk)
        user=User.objects.get(id=user_id)
        if(user.points<point):
            return ('보유하고 있는 포인트를 확인해 주세요.')
             
        try:
            pre=Prediction.objects.get(match_id=match_pk,user_id=1)
            return ('이미 예측을 완료한 경기입니다.')
           
        except Prediction.DoesNotExist:
            user.points-=point
            user.save()
            po=Point.objects.create(user_id=user,point=point,info='경기 결과 예측 배팅')
            pred=Prediction.objects.create(user_point=point,predict=predict,match_id=match,user_id=user)
           

        try:  
            match_num=Bet.objects.get(id=match_pk)
        except Bet.DoesNotExist:
            bet=Bet.objects.create(id=match, win=0, draw=0, lose=0)
            
        bet=Bet.objects.get(id=match_pk)
        
        if(predict==0):
            bet.win+=point
        elif(predict==1):
            bet.draw+=point
        else: 
            bet.lose+=point

        bet.save()
        
        return ('success')
            
    @swagger_auto_schema(operation_id="승부 예측", operation_description="승부 예측하기", request_body=param)
    def post(self, request, format=None):
        # token=request.COOKIES.get('jwt')
        # pay=jwt.decode(token,SECRET_KEY, algorithms=['HS256'])
        # user_id=pay['id']
        user_id=1
        ingredient = self.get_object(user_id,request.data['match_pk'],request.data['point'],request.data['predict'])

        #print(request.META.get('HTTP_AUTHORIZATION'))
        print(ingredient)
        if (ingredient=='success'):
            return Response(ingredient,status=status.HTTP_200_OK)
        else :
            return Response({'error' :ingredient},status=status.HTTP_400_BAD_REQUEST)
        

#승부 예측 여부 GET
class predictinfo(APIView):
    id = openapi.Parameter('id', openapi.IN_PATH, description='match_id', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="유저의 승부 예측 여부를 조회", operation_description="제공 받은 토큰 값을 기준으로 유저를 파악하고 해당 유저가 승부 예측을 했는지 확인한다", manual_parameters=[id])
    def get(self, request, id):

        today=datetime.datetime.now()+datetime.timedelta(minutes=5)

        
        if Match.objects.filter(Q(id=id) &Q(start_date=today.date(), start_time__lte=time.time())) :
            return Response({False},status=status.HTTP_200_OK)

        if not Match.objects.filter(id=id) :
            return Response({False},status=status.HTTP_400_BAD_REQUEST)

        # token=request.COOKIES.get('jwt')
        # pay=jwt.decode(token,SECRET_KEY, algorithms=['HS256'])
        # user_id=pay['id']
        user_id=1
        try:
            predict=Prediction.objects.get(match_id=id ,user_id=user_id)
            return Response({False}, status=status.HTTP_200_OK)
        except Prediction.DoesNotExist:
            return Response({True}, status=status.HTTP_200_OK)
        except Prediction.MultipleObjectsReturned:
            return Response({False}, status=status.HTTP_400_BAD_REQUEST)


# AUTO 정산            
@transaction.atomic()
def predictcalc():
    today=datetime.datetime.now().date()
    time=datetime.datetime.now().time()
    matches= Match.objects.filter(Q(start_date=today, start_time__lte=time) | Q(start_date=today-datetime.timedelta(days=1), start_time__gt=time))
    for match in matches:
        result=0
        dang=0

        bet=Bet.objects.get(id=match.id)
        total=bet.win+bet.draw+bet.lose
        if(match.team1_score>match.team2_score and bet.win!=0):
            result=0
            dang=total/bet.win
        elif(match.team1_score==match.team2_score and bet.draw!=0):
            result=1
            dang=total/bet.draw
        elif(match.team1_score<match.team2_score and bet.lose!=0):
            result=2
            dang=total/bet.lose

        predictinfo=Prediction.objects.filter(match_id=match.id,predict=result)

        for pre in predictinfo:
            user=User.objects.get(id=pre.user_id.id)
            user.points+=(dang*pre.user_point)
            user.save()
            po=Point.objects.create(user_id=user,point=dang*pre.user_point,info='경기 예측 성공')

#선수 뽑기 POST
class card(APIView):
    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['team_id', 'gacha_count', 'point'],
    properties={
        'team_id': openapi.Schema(type=openapi.TYPE_NUMBER, description="국가 번호"),
        'gacha_count': openapi.Schema(type=openapi.TYPE_NUMBER, description="가챠 횟수"),
        'point': openapi.Schema(type=openapi.TYPE_NUMBER, description="소모 포인트"),
        })

    @transaction.atomic()
    def get_object(self, user_id, team_id,gacha_count,point):
        c_list=[]
        user=User.objects.get(id=user_id)

        if(user.points<point):
            return ('보유하고 있는 포인트를 확인해 주세요.')

        for i in range(gacha_count):
            if(team_id > 0):
                card=Player.objects.filter(team_id=team_id).order_by('?').first()
            else :
                card=Player.objects.order_by('?').first()   

            find=PlayerCard.objects.filter(Q(player_id=card.id) & Q(user_id=user_id)).count()
            if(find==0):
                user.value+=card.value
            new_card=PlayerCard.objects.create(player_id=card, user_id=user)
            serializer = CardSerializer(card)
            c_list.append(serializer.data)
        user.points-=point
        user.save()
        po=Point.objects.create(user_id=user,point=point,info='선수 뽑기')

        return (c_list)

    @swagger_auto_schema(operation_id="카드 뽑기", operation_description="새로운 선수카드 뽑기", request_body=param)
    def post(self, request, format=None):
        # token=request.COOKIES.get('jwt')
        # pay=jwt.decode(token,SECRET_KEY, algorithms=['HS256'])
        # user_id=pay['id']
        user_id=1
        gacha=self.get_object(user_id,request.data['team_id'],request.data['gacha_count'],request.data['point'])

        if(gacha=='보유하고 있는 포인트를 확인해 주세요.'):
            return Response({'error' :gacha},status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(gacha,status=status.HTTP_200_OK)

    @swagger_auto_schema(operation_id="유저의 보유하고 있는 카드 확인", operation_description="해당 유저가 보유하고 있는 모든 카드의 정보를 가져온다.")
    def get(self, request):
        c_list=[]
        country = request.GET.get('country', None)
        if country is not None:
            team=Team.objects.get(country=country)
        
        # token=request.COOKIES.get('jwt')
        # pay=jwt.decode(token,SECRET_KEY, algorithms=['HS256'])
        # user_id=pay['id']
        user_id=1

        card=PlayerCard.objects.filter(user_id=user_id).order_by('player_id')

        for i in card:
            C=Player.objects.get(id=i.player_id.id)
            if country is not None:
                if(C.team_id != team):
                    continue
            serializer = CardSerializer(C)
            
            c_list.append(serializer.data)
        
        return Response(c_list)       

#선수 합성 POST
class combine(APIView):
    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['player_card_id1', 'player_card_id2'],
    properties={
        'player_card_id1': openapi.Schema(type=openapi.TYPE_NUMBER, description="첫 번째 선수 카드"),
        'player_card_id2': openapi.Schema(type=openapi.TYPE_NUMBER, description="두 번째 선수 카드"),
        })


    @transaction.atomic()
    def get_object(self, user_id, card1, card2):
        user=User.objects.get(id=user_id)
        first=PlayerCard.objects.get(id=card1)
        second=PlayerCard.objects.get(id=card2)
        team=-1

        if(user_id != first.user_id.id or user_id != second.user_id.id):
            return ('보유하고 있지 않은 선수카드입니다.')
        
        if(first.player_id.team_id == second.player_id.team_id):
            team=first.player_id.team_id.id
        

        if(team>0):
            card=Player.objects.filter(Q(team_id=team) & ~Q(id=first.player_id.id) & ~Q(id=second.player_id.id)).order_by('?').first()
        else :
            card=Player.objects.filter((~Q(id=first.player_id.id) & ~Q(id=second.player_id.id))).order_by('?').first()     

        if card is None:
            return ('뽑을 선수가 없습니다.')
    
        find=PlayerCard.objects.filter(Q(player_id=card.id) & Q(user_id=user_id)).count()
        if(find==0):
           user.value+=card.value

        firstfind=PlayerCard.objects.filter(Q(player_id=first.player_id.id) & Q(user_id=user_id)).count()
        secondfind=PlayerCard.objects.filter(Q(player_id=second.player_id.id) & Q(user_id=user_id)).count()
        

        if(firstfind==1):
            user.value-=first.player_id.value
        if(secondfind==1):
            user.value-=second.player_id.value

        user.save()
        first.delete()
        second.delete()
        new_card=PlayerCard.objects.create(player_id=card, user_id=user)
        serializer = CardSerializer(card)
        return (serializer.data)

    @swagger_auto_schema(operation_id="카드 합성", operation_description="기존의 선수 합성하여 새 선수 뽑기", request_body=param)
    def post(self, request, format=None):
        # token=request.COOKIES.get('jwt')
        # pay=jwt.decode(token,SECRET_KEY, algorithms=['HS256'])
        # user_id=pay['id']
        user_id=1
        comb=self.get_object(user_id,request.data['player_card_id1'],request.data['player_card_id2'])

        if(comb=='보유하고 있지 않은 선수카드입니다.' or comb=='뽑을 선수가 없습니다.'):
            return Response({'error' :comb},status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(comb,status=status.HTTP_200_OK)

# 랭킹 조회 POST
class rank(APIView):
    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['type',],
    properties={
        'type': openapi.Schema(type=openapi.TYPE_STRING, description="랭킹의 타입"),
        })

    def get_object(self, type):
        R_list=[]
        if(type=='value'):
            user=User.objects.all().order_by('-value')
            for i in user:
                serializer = UserrankSerializer(i)
                R_list.append(serializer.data)
            
        elif(type=='player'):
            player=Player.objects.all().order_by('-goal')
            for i in player:
                serializer=goalrankSerializer(i)
                R_list.append(serializer.data)

        return (R_list)   


    @swagger_auto_schema(operation_id="랭킹 조회", operation_description="타입에 따라 보유하고 있는 포인트 혹은 보유하고 있는 선수의 가치 랭킹 조회", request_body=param)
    def post(self, request, format=None):
        rank=self.get_object(request.data['type'])
        return Response(rank,status=status.HTTP_200_OK)


# 그룹 정보 조회 GET
class GroupInfo(APIView):
    @swagger_auto_schema(operation_id="그룹 정보 조회", operation_description="url을 통해 그룹 정보 조회", responses={200: '조회 성공'})
    def get(self, request):
        teams = Team.objects.all().values('group', 'id', 'country', 'logo').order_by('group')
        group_info = []
        for t in teams:
            team_name = team_k(t['id'])
            curr_team = [t['group'], t['id'], team_name, t['logo']]
            group_info.append(curr_team)
        
        return Response(group_info)


# 경기 정보 조회 (국가별) GET
class MatchInfoByTeam(APIView):
    country = openapi.Parameter('id', openapi.IN_PATH, description='team id', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="경기 정보 조회 (국가별)", operation_description="국가 고유번호로 경기 조회", manual_parameters=[id], responses={200: '조회 성공'})
    def get(self, request, id):
        games = []
        homegame = Match.objects.filter(team1_id=id)
        awaygame = Match.objects.filter(team2_id=id)
        for hg in homegame:
            games.append(hg.id)
        for ag in awaygame:
            games.append(ag.id)
        
        match_list = []
        for g in sorted(games):
            match = Match.objects.get(id=g)
            venue_name, address = venue_k(match.venue_id.id)
            team1_name, team2_name = team_k(match.team1_id.id), team_k(match.team2_id.id)
            curr_info = [match.id, match.start_date, match.start_time, venue_name, address,
                        team1_name, match.team1_id.logo, match.team1_id.group, team2_name, match.team2_id.logo]
            match_list.append(curr_info)
        
        return Response(match_list)


# 경기 정보 조회 (날짜별) GET
class MatchInfoByDate(APIView):
    date = openapi.Parameter('id', openapi.IN_PATH, description='date in YYYYMMDD', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="경기 정보 조회 (날짜별)", operation_description="날짜 입력으로 경기 조회 (날짜양식: YYYYMMDD)", manual_parameters=[id], responses={200: '조회 성공'})

    def get(self, request, id):
        id=str(id)
        match_date = datetime.datetime(int(id[:4]), int(id[4:6]), int(id[6:8]))   # 경기 시간을 datetime 포맷으로 변환
                
        match_list = []
        games = Match.objects.filter(start_date=str(match_date)[:10])
        for g in games:
            match = Match.objects.get(id=g.id)
            venue_name, address = venue_k(match.venue_id.id)
            team1_name, team2_name = team_k(match.team1_id.id), team_k(match.team2_id.id)
            curr_info = [match.id, match.start_date, match.start_time, venue_name, address,
                        team1_name, match.team1_id.logo, match.team1_id.group, team2_name, match.team2_id.logo]
            match_list.append(curr_info)
        
        match_list = sorted(match_list, key=operator.itemgetter(2, 7))

        return Response(match_list)


# 경기 상세 정보 조회 GET
class MatchDetail(APIView):
    game = openapi.Parameter('id', openapi.IN_PATH, description='match id', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="경기 상세 정보 조회", operation_description="경기 고유번호로 상세 정보 조회", manual_parameters=[id], responses={200: '조회 성공'})
    def get(self, request, id):
        match = Match.objects.get(id=id)
        venue_name, address = venue_k(match.venue_id.id)
        team1_name, team1_rank = team_k(match.team1_id.id)[0], team_k(match.team1_id.id)[1]
        team2_name, team2_rank = team_k(match.team2_id.id)[0], team_k(match.team2_id.id)[1]
        match_detail = [match.id, match.start_date, match.start_time, venue_name, address,
                        match.team1_id.id, team1_name, match.team1_id.logo, match.team1_id.group, team1_rank, match.team1_id.win, match.team1_id.draw, match.team1_id.loss,
                        match.team1_id.points, match.team1_id.last_five, match.team1_id.goal_diff, match.team1_id.manager, match.team1_id.round,
                        match.team2_id.id, team2_name, match.team2_id.logo, match.team2_id.group, team2_rank, match.team2_id.win, match.team2_id.draw, match.team2_id.loss,
                        match.team2_id.points, match.team2_id.last_five, match.team2_id.goal_diff, match.team2_id.manager, match.team2_id.round]
        
        return Response(match_detail)


# 그룹 순위표 조회 GET
class MatchTable(APIView):
    group = openapi.Parameter('id', openapi.IN_PATH, description='group name', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="순위표 조회", operation_description="조 이름으로 순위표 조회", manual_parameters=[id], responses={200: '조회 성공'})
    def get(self, request, id):
        teams = Team.objects.filter(group=id)
        team_table = []
        for t in teams:
            team_name = team_k(t.id)
            curr_team = [team_name, t.win, t.draw, t.loss, t.points, t.goal_diff, -1*(t.points*100+t.goal_diff)] 
            team_table.append(curr_team)

        team_table = sorted(team_table, key=operator.itemgetter(4, 5))

        df = pd.DataFrame(team_table, columns=['name', 'win', 'draw', 'loss', 'points', 'goal_diff', 'rank_pts'])
        df['rank_min'] = df['rank_pts'].rank(method='min')
        new_table = df.values.tolist()

        rank_table = []
        for i in range(len(new_table)):
            new_table[i].insert(0, int(new_table[i][-1]))
            rank_table.append(new_table[i][:-2])
        
        rank_table = sorted(rank_table, key=operator.itemgetter(0))
        
        return Response(rank_table)


# 팀 정보 조회 GET
class TeamInfo(APIView):
    team = openapi.Parameter('id', openapi.IN_PATH, description='team id', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="팀 정보 조회", operation_description="팀 고유번호로 정보 조회", manual_parameters=[id], responses={200: '조회 성공'})
    def get(self, request, id):
        team = Team.objects.get(id=id)
        team_info = [["감독님", team.manager, 0, 0]]

        players = Player.objects.filter(team_id=id)
        for p in players:
            fullnameKR = player_k(p.id)
            position = player_pos(p.position)
            team_info.append([fullnameKR, p.fullname, position, p.number])
        
        return Response(team_info)
