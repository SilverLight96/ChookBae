import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from django.http import Http404
import datetime
import operator
from django.db import transaction
from django.shortcuts import render
from django.db.models import Q,Subquery
from rest_framework import status
from rest_framework.response import Response
from .Serializers import UserrankSerializer,matchidSerializer
from .models import  Point, Venue, Team, Match, Player, PlayerCard, Prediction, Bet, EmailCert
from accounts.models import User
from .translation import venue_k, team_k, player_k, player_pos
from .playervaluesetup import value_p
import pandas as pd
import jwt
from chookbae.settings import SECRET_KEY
from secret.apikey import API_KEY


# Create your views here.

# 승부 예측 POST
 
class matchpredict(APIView):
    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['match_id', 'point', 'predict'],
    properties={
        'match_id': openapi.Schema(type=openapi.TYPE_NUMBER, description="경기 번호"),
        'point': openapi.Schema(type=openapi.TYPE_NUMBER, description="배팅 포인트"),
        'predict': openapi.Schema(type=openapi.TYPE_NUMBER, description="승부 예측"),
        })

    @transaction.atomic()
    def get_object(self,user_id, match_id, point, predict):
        point=int(point)
        today=datetime.datetime.now()+datetime.timedelta(minutes=5)

        
        if Match.objects.filter(Q(id=match_id) &Q(start_date=today.date(), start_time__lte=today.time())) :
            return ('예측 가능한 시간이 초과되었습니다.')

        match=Match.objects.get(id=match_id)
        user=User.objects.get(id=user_id)
        
        if(user.points<point):
            return ('보유하고 있는 포인트를 확인해 주세요.')
             
        try:
            pre=Prediction.objects.get(match_id=match_id,user_id=user_id)
            return ('이미 예측을 완료한 경기입니다.')
           
        except Prediction.DoesNotExist:
            user.points-=point
            user.save()
            po=Point.objects.create(user_id=user,point=-1*point,info='경기 결과 예측 배팅')
            pred=Prediction.objects.create(user_point=point,predict=predict,match_id=match,user_id=user)
           

        try:  
            match_num=Bet.objects.get(id=match_id)
        except Bet.DoesNotExist:
            bet=Bet.objects.create(id=match, win=0, draw=0, lose=0)
            
        bet=Bet.objects.get(id=match_id)
        
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
        token=request.META.get('HTTP_AUTHORIZATION')
        pay=jwt.decode(token,SECRET_KEY, algorithms=['HS256'])
        user_id=pay['id']
        ingredient = self.get_object(user_id,request.data['match_id'],request.data['point'],request.data['predict'])

        #print(request.META.get('HTTP_AUTHORIZATION'))
        print(ingredient)
        if (ingredient=='success'):
            return Response(ingredient,status=status.HTTP_200_OK)
        else :
            return Response({'error' :ingredient},status=status.HTTP_400_BAD_REQUEST)

#승부 예측 경기 리스트 GET
class predictlist(APIView):
    date = openapi.Parameter('id', openapi.IN_PATH, description='date in YYYYMMDD', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="경기 정보 조회 (날짜별)", operation_description="날짜 입력으로 경기 조회 (날짜양식: YYYYMMDD)", manual_parameters=[id])
    def get(self, request, id):
        match_list=[]
        id=str(id)
        match_date = datetime.datetime(int(id[:4]), int(id[4:6]), int(id[6:8]))

        matches = Match.objects.filter(start_date=match_date)
        for i in matches:
            serializer = matchidSerializer(i)
            match_list.append(serializer.data)
        
        print(match_list)
        return Response(match_list,status=status.HTTP_200_OK)

#승부 예측 정보 조회 GET
class predicdetail(APIView):
    def get(self, request, id):
        token=request.META.get('HTTP_AUTHORIZATION')
        pay=jwt.decode(token,SECRET_KEY, algorithms=['HS256'])
        user_id=pay['id']
        user=User.objects.get(id=user_id)
        point=user.points

        try:
            bet=Bet.objects.get(id=id)
        except:
            if not Match.objects.filter(id=id):
                return Response({'error': '경기 정보를 찾을수 없습니다.'},status=status.HTTP_400_BAD_REQUEST)
            else :
                bet=Bet.objects.create(id=Match.objects.get(id=id),win=0,draw=0,lose=0)
                
        win_dang=0
        draw_dang=0
        lose_dang=0

        win_count=Prediction.objects.filter(Q(match_id=id) & Q(predict=0)).count()
        draw_count=Prediction.objects.filter(Q(match_id=id) & Q(predict=1)).count()
        lose_count=Prediction.objects.filter(Q(match_id=id) & Q(predict=2)).count()

        total=bet.win+bet.draw+bet.lose

        if(bet.win!=0): win_dang=total/bet.win
        if(bet.draw!=0): draw_dang=total/bet.draw
        if(bet.lose!=0): lose_dang=total/bet.lose

        return Response({'win_count': win_count, 'win_total': bet.win, 'win_dang': win_dang,
        'draw_count': draw_count, 'draw_total': bet.draw, 'draw_dang': draw_dang,
        'lose_count': lose_count, 'lose_total': bet.lose, 'lose_dang': lose_dang,'total_point' :total, 'point' : point,},status=status.HTTP_200_OK)

#승부 예측 여부 GET
class predictinfo(APIView):
    id = openapi.Parameter('id', openapi.IN_PATH, description='match_id', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="유저의 승부 예측 여부를 조회", operation_description="제공 받은 토큰 값을 기준으로 유저를 파악하고 해당 유저가 승부 예측을 했는지 확인한다", manual_parameters=[id])
    def get(self, request, id):

        token=request.META.get('HTTP_AUTHORIZATION')
        pay=jwt.decode(token,SECRET_KEY, algorithms=['HS256'])
        user_id=pay['id']
        
        today=datetime.datetime.now()+datetime.timedelta(minutes=5)

        
        if Match.objects.filter(Q(id=id) &Q(start_date=today.date(), start_time__lte=today.time())) :
            return Response({False},status=status.HTTP_200_OK)

        if not Match.objects.filter(id=id) :
            return Response({False},status=status.HTTP_400_BAD_REQUEST)

        

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

        predictinfo=Prediction.objects.filter(match_id=match.id,result=-1)

        for pre in predictinfo:
            if(pre.predict==result):
                user=User.objects.get(id=pre.user_id.id)
                user.points+=(dang*pre.user_point)
                user.save()
                po=Point.objects.create(user_id=user,point=dang*pre.user_point,info='경기 예측 성공')
                pre.result=1
                pre.save()
            else:
                pre.result=0
                pre.save()

class teamlist(APIView):
    @swagger_auto_schema(operation_id="전체 팀의 간단한 정보를 가져온다.", operation_description="유저가 국가를 선택하여 뽑기를 희망하는 경우 국가에 대한 간략한 정보를 보여준다")
    def get(self, request):
        teams = Team.objects.all().order_by('group')
        g_list = []
        for t in teams:
            team_name = team_k(t.id)[0]
            g_list.append({'id': t.id,  'country' : team_name, 'logo' : t.logo})
        
        return Response(g_list,status=status.HTTP_200_OK)
        

#선수 뽑기 POST
class card(APIView):
    param = openapi.Schema(type=openapi.TYPE_OBJECT, required=['group_id', 'gacha_count', 'point'],
    properties={
        'group_id': openapi.Schema(type=openapi.TYPE_STRING, description="그룹"),
        'gacha_count': openapi.Schema(type=openapi.TYPE_NUMBER, description="가챠 횟수"),
        'point': openapi.Schema(type=openapi.TYPE_NUMBER, description="소모 포인트"),
        })

    def get_object(self, user_id, group_id, gacha_count):
        
        gacha_count=int(gacha_count)
       
        c_list=[]
        user=User.objects.get(id=user_id)

        

        if(group_id == "상관없음"):
            point=0*gacha_count
        else:
            point=0*gacha_count

        if(user.points<point):
            return ('보유하고 있는 포인트를 확인해 주세요.')
        
        for i in range(gacha_count):
            try:
                if(group_id == "상관없음"):
                    card=Player.objects.order_by('?').first()
                else :
                    team=Team.objects.filter(group=group_id).order_by('?').first()
                    card=Player.objects.filter(team_id=team.id).order_by('?').first()   
                    if card is None:
                        raise Exception
            except:
                return ('그룹 선택을 다시 확인해주세요.')



            find=PlayerCard.objects.filter(Q(player_id=card.id) & Q(user_id=user_id))
            if (len(find) ==0 ):
                new_card=PlayerCard.objects.create(player_id=card, user_id=user)
                user.value+=card.value
            else :
                cc=PlayerCard.objects.get(player_id=card.id , user_id=user_id)
                cc.count += 1
                cc.save()
            
            player_name= player_k(card.id)
            list={'fullname' : player_name, 'player_image' : card.player_image, 'logo' : card.team_id.logo, 'value' : card.value }
            c_list.append(list)
        user.points-=point
        user.save()
        po=Point.objects.create(user_id=user,point=-1*point,info='선수 뽑기')

        c_list.sort(key=lambda x: x["fullname"])

        return (c_list)

    @swagger_auto_schema(operation_id="카드 뽑기", operation_description="새로운 선수카드 뽑기", request_body=param)
    def post(self, request, format=None):
        token=request.META.get('HTTP_AUTHORIZATION')
        pay=jwt.decode(token,SECRET_KEY, algorithms=['HS256'])
        user_id=pay['id']
        gacha=self.get_object(user_id,request.data['group_id'],request.data['gacha_count'])

        if(gacha=='보유하고 있는 포인트를 확인해 주세요.' or gacha=='그룹 선택을 다시 확인해주세요.'):
            return Response({'error' :gacha},status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(gacha,status=status.HTTP_200_OK)

    @swagger_auto_schema(operation_id="유저의 보유하고 있는 카드 확인", operation_description="해당 유저가 보유하고 있는 모든 카드의 정보를 가져온다.")
    def get(self, request, id):
        print(datetime.datetime.now())
        c_list=[]
        country = id
        if (country>0):
            team=Team.objects.get(id=country)
        
        token=request.META.get('HTTP_AUTHORIZATION')
        pay=jwt.decode(token,SECRET_KEY, algorithms=['HS256'])
        user_id=pay['id']

        card=PlayerCard.objects.filter(user_id=user_id).order_by('player_id')

        for i in card:
            C=Player.objects.get(id=i.player_id.id)
            if (country>0):
                if(C.team_id != team):
                    continue
            player_name=player_k(C.id)
            c_list.append({'id' : C.id, 'player_image' : C.player_image, 'fullname' : player_name, 'logo' : C.team_id.logo, 'value' : C.value, 'count' : i.count })


        c_list.sort(key=lambda x: x["fullname"])    
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

        try:
            first=PlayerCard.objects.get(Q(player_id=card1) & Q(user_id=user_id))
            second=PlayerCard.objects.get(Q(player_id=card2) & Q(user_id=user_id))

            if (first != second  and first.count<1 and second.count<1) :
                raise Exception
            elif (first==second and first.count<2):
                raise Exception
            team=-1
        except:
            return ('보유하고 있지 않은 선수카드입니다.')


        if(first.player_id.team_id == second.player_id.team_id):
            team=first.player_id.team_id.id
        

        if(team>0):
            card=Player.objects.filter(Q(team_id=team) & ~Q(id=first.player_id.id) & ~Q(id=second.player_id.id)).order_by('?').first()
        else :
            card=Player.objects.filter((~Q(id=first.player_id.id) & ~Q(id=second.player_id.id))).order_by('?').first()     

        if card is None:
            return ('뽑을 선수가 없습니다.')
    
        find=PlayerCard.objects.filter(Q(player_id=card.id) & Q(user_id=user_id))

        if (len(find)==0):
            new_card=PlayerCard.objects.create(player_id=card, user_id=user)
            user.value+=card.value
        else :
            cc=PlayerCard.objects.get(player_id=card.id,user_id=user_id)
            cc.count += 1
            cc.save()
        

        if(first.count==1):
            user.value-=first.player_id.value
            first.delete()
        else :
            if(first==second):
                second.count-=1
                second.save()
            else :
                first.count-=1
                first.save()

        if(second.count==1):
            user.value-=second.player_id.value
            second.delete()
        else:
            second.count-=1
            second.save()

        
        user.save()
        player_name= player_k(card.id)
        list={'fullname' : player_name, 'player_image' : card.player_image, 'logo' : card.team_id.logo, 'value' : card.value }

        return (list)

    @swagger_auto_schema(operation_id="카드 합성", operation_description="기존의 선수 합성하여 새 선수 뽑기", request_body=param)
    def post(self, request, format=None):
        token=request.META.get('HTTP_AUTHORIZATION')
        pay=jwt.decode(token,SECRET_KEY, algorithms=['HS256'])
        user_id=pay['id']
        comb=self.get_object(user_id,request.data['player_card_id1'],request.data['player_card_id2'])

        if(comb=='보유하고 있지 않은 선수카드입니다.' or comb=='뽑을 선수가 없습니다.'):
            return Response({'error' :comb},status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(comb,status=status.HTTP_200_OK)

# 랭킹 조회 POST
class rank(APIView):

    def get(self, request):
        R_list=[]
        num=1
        id=request.GET['type']
        if(id=='value'):
            user=User.objects.all().order_by('-value')
            for i in user:
                R_list.append({'nickname' : i.nickname, 'value' : i.value, 'rank' : num })  
                num+=1
            
        elif(id=='player'):
            player=Player.objects.all().order_by('-value')
            for i in player:
                player_name= player_k(i.id)
                R_list.append({'fullname' : player_name, 'goal' : i.goal, 'value' : i.value ,'rank' : num })
                num+=1

        return Response(R_list,status=status.HTTP_200_OK)   


   


class TopRank(APIView):

    def get(self, request):
        user_list=[]
        player_list=[]
        num=1

        user=User.objects.all().order_by('-value')[:5]
        for i in user:
            user_list.append({'nickname' : i.nickname, 'value' : i.value, 'rank' : num })  
            num+=1

        num=1 
        player=Player.objects.all().order_by('-value')[:5]
        for i in player:
            player_name= player_k(i.id)
            player_list.append({'fullname' : player_name, 'goal' : i.goal, 'value' : i.value ,'rank' : num })
            num+=1

        return Response({'user_list': user_list, 'player_list':player_list},status=status.HTTP_200_OK) 



# 그룹 정보 조회 GET
class GroupInfo(APIView):
    @swagger_auto_schema(operation_id="그룹 정보 조회", operation_description="url을 통해 그룹 정보 조회", responses={200: '조회 성공'})
    def get(self, request):
        teams = Team.objects.all().values('group', 'id', 'country', 'logo').order_by('group')
        group_info = []
        for t in teams:
            team_name = team_k(t['id'])[0]
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
            team1_name, team2_name = team_k(match.team1_id.id)[0], team_k(match.team2_id.id)[0]
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
            team1_name, team2_name = team_k(match.team1_id.id)[0], team_k(match.team2_id.id)[0]
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
            team_name = team_k(t.id)[0]
            curr_team = [team_name, t.win, t.draw, t.loss, t.points, t.goal_diff, -1*(t.points*100+t.goal_diff)] 
            team_table.append(curr_team)

        team_table = sorted(team_table, key=operator.itemgetter(4, 5))

        df = pd.DataFrame(team_table, columns=['name', 'win', 'draw', 'loss', 'points', 'goal_diff', 'rank_pts'])
        df['rank_min'] = df['rank_pts'].rank(method='min')
        new_table = df.values.tolist()

        rank_table = []
        for i in range(len(new_table)):
            new_table[i].insert(0, int(new_table[i][-1]))   # 조별순위를 0번 인덱스에 추가하기
            rank_table.append(new_table[i][:-2])            # 필요한 부분만 슬라이싱 후 rank_table에 삽입
        
        rank_table = sorted(rank_table, key=operator.itemgetter(0))
        
        return Response(rank_table)


# 팀 정보 조회 GET
class TeamInfo(APIView):
    team = openapi.Parameter('id', openapi.IN_PATH, description='team id', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="팀 정보 조회", operation_description="팀 고유번호로 정보 조회", manual_parameters=[id], responses={200: '조회 성공'})
    def get(self, request, id):
        team = Team.objects.get(id=id)
        team_info = [["감독님", team.manager, "FM", 0]]

        players = Player.objects.filter(team_id=id)
        for p in players:
            fullnameKR = player_k(p.id)
            position = player_pos(p.position)
            team_info.append([fullnameKR, p.fullname, position, p.number])
        
        return Response(team_info)


# 선수 실제 랭킹 조회 GET
class PlayerRanking(APIView):
    @swagger_auto_schema(operation_id="선수 랭킹 조회", operation_description="url을 통해 선수 랭킹 조회", responses={200: '조회 성공'})
    def get(self, request):
        goal = Player.objects.all().order_by('-goal', '-assist', '-run_time')[:10]
        assist = Player.objects.all().order_by('-assist', '-goal', '-run_time')[:10]
        yellow = Player.objects.all().order_by('-yellow_card', '-red_card')[:10]
        red = Player.objects.all().order_by('-red_card', '-yellow_card')[:10]
        run_time = Player.objects.all().order_by('-run_time', '-goal', '-assist')[:10]

        goal_rank, assist_rank, yellow_rank, red_rank, run_time_rank = ["goal"], ["assist"], ["yellow"], ["red"], ["run_time"]

        for g in goal:
            goal_rank.append(g.id)
        for a in assist:
            assist_rank.append(a.id)
        for y in yellow:
            yellow_rank.append(y.id)
        for r in red:
            red_rank.append(r.id)
        for rt in run_time:
            run_time_rank.append(rt.id)

        player_ranking = [goal_rank, assist_rank, yellow_rank, red_rank, run_time_rank]
        
        return Response(player_ranking)


# 선수 정보 조회 GET
class PlayerInfo(APIView):
    player = openapi.Parameter('id', openapi.IN_PATH, description='player id', required=True, type=openapi.TYPE_NUMBER)
    @swagger_auto_schema(operation_id="선수 정보 조회", operation_description="선수 고유번호로 정보 조회", manual_parameters=[id], responses={200: '조회 성공'})
    def get(self, request, id):
        player = Player.objects.get(id=id)
        fullnameKR = player_k(player.id)
        position = player_pos(player.position)
        country = team_k(player.team_id.id)[0]
        player_info = [player.id, fullnameKR, player.player_image, country, position, player.number, player.current_team,
                        player.birthday, player.weight, player.height, player.goal, player.assist, player.yellow_card, player.red_card, player.run_time, player.value]

        return Response(player_info)


# 선수 시세 변동 알고리즘 및 자동 반영      >> 하루 1회 업데이트 @ 오후 12시
def playerValueUpdate():
    
    # 선수 시세 설정 코드
    players = Player.objects.all()
    for player in players:
        # 초기값 설정하기 (소속 국가의 피파랭킹, 소속 팀이 속한 리그)
        init_value = 100 * (100 - team_k(player.team_id.id)[1]) * value_p(player.current_team)
        
        # 월드컵 성적으로 시세 조정하기
        goal, assist, yellow, red, runtime = player.goal, player.assist, player.yellow_card, player.red_card, player.run_time
        team = Team.objects.get(id=player.team_id.id)
        win, draw, loss, goal_diff = team.win, team.draw, team.loss, team.goal_diff
        player.value = (init_value * (1 + goal * 0.3) * (1 + assist * 0.1) * (1 - yellow * 0.05) * (1 - red * 0.2) * (1 + runtime * 0.002)
                        + (3000 * win) + (1000 * draw) - (500 * loss) + (100 * goal_diff))
        player.save()
    


# 경기 정보 자동 업데이트       >> KST 18시 ~ 익일 7시 동안 1분 주기로 자동 업데이트 (12시간 x 60회 = 720회 갱신)
def matchUpdate():
    pending_result = []     # 경기 결과는 나왔지만 경기 상세 정보가 미제공인 경기들의 id 리스트
    
    # 실시간 경기 정보 API로 받아오기
    BASE_URL = 'https://api.statorium.com/api/v1/matches/live/'
    params = {'apikey': API_KEY}
    response = requests.get(BASE_URL, params=params)
    data = response.json()

    ##### 임시 데이터 (월드컵 live matches가 없을때 테스트용) #####
    import json
    data = json.load(open('worldcup/livematchtest.json'))
    ##### 임시 데이터 끝 ########################################

    # match list 구하기
    match_list = []
    matches = Match.objects.all()
    for match in matches:
        match_list.append([match.id, match.match_status])
    
    # 실시간 경기 API에서 종료된 경기들을 받아와서 DB 경기 데이터와 대조 후 내용 업데이트
    for m in data['matches']:
        if m['matchStatus']['value'] == "-1":       # -1 = 진행중인 경기
            # Match 테이블에 실시간 스코어 업데이트
            match = Match.objects.get(id=m['matchID'])
            match.match_status = 1          # 매치 상태도 -1로 (진행중인 경기) 수정
            match.team1_score = t1_score
            match.team2_score = t2_score
            match.save()

        elif ((m['matchStatus']['value'] == "1") and [int(m['matchID']), -1] in match_list):     # 1 = 종료된 경기
            pending_result.append(int(m['matchID'])) # 우선 경기 상세 정보는 아직 미제공이라고 간주하고 pending_result 리스트에 누적 (다음 for문에서 처리 예정)

            t1_id = int(m['homeParticipant']['participantID'])
            t1_score = int(m['homeParticipant']['score'])
            t2_id = int(m['awayParticipant']['participantID'])
            t2_score = int(m['awayParticipant']['score'])
            
            # Match 테이블에 정보 업데이트
            match = Match.objects.get(id=m['matchID'])
            match.match_status = 1          # 매치 상태도 1로 (종료된 경기) 수정
            match.team1_score = t1_score
            match.team2_score = t2_score
            match.save()

            # Team 테이블에 홈팀 정보 업데이트
            team1 = Team.objects.get(id=t1_id)
            if t1_score > t2_score:
                team1.win += 1
                team1.points += 3
            elif t1_score == t2_score:
                team1.draw += 1
                team1.points += 1
            elif t1_score < t2_score:
                team1.loss += 1
            team1.goal_diff += (t1_score - t2_score)
            team1.save()

            # Team 테이블에 원정팀 정보 업데이트
            team2 = Team.objects.get(id=t2_id)
            if t2_score > t1_score:
                team2.win += 1
                team2.points += 3
            elif t2_score == t1_score:
                team2.draw += 1
                team2.points += 1
            elif t2_score < t1_score:
                team2.loss += 1
            team2.goal_diff += (t2_score - t1_score)
            team2.save()
    
    # 종료된 경기지만 상세 정보 미입력인 경우 API를 통해 상세정보 받아와서 선수 스탯 업데이트
    for match_id in pending_result:
        # 경기 상세 정보 API로 받아오기
        BASE_URL = 'https://api.statorium.com/api/v1/matches/'
        params = {'apikey': API_KEY}
        response = requests.get(BASE_URL+str(match_id)+'/', params=params)
        data = response.json()

        ##### 임시 데이터 (종료된 월드컵 경기가 없을때 테스트용) #####
        import json
        data = json.load(open('worldcup/matchdetailtest.json'))
        ##### 임시 데이터 끝 ######################################

        if data["match"]["matchStatus"]["statusID"] == "1":
            # 경기 시간 변수 설정
            game_time = int(data["match"]["matchDuration"])

            # 홈팀 선수 출장시간 업데이트
            home_runtime = []    # 선수 출장시간 담을 리스트
            for p in data["match"]["homeParticipant"]["squad"]["lineup"]:
                home_runtime.append([int(p["playerID"]), game_time])
            for s in data["match"]["homeParticipant"]["squad"]["subs"]:
                home_runtime.append([int(s["playerIN"]), game_time - int(s["minute"])])
                for player in home_runtime:
                    if player[0] == int(s["playerOUT"]):
                        player[1] -= (game_time - int(s["minute"]))     # 교체출전한 선수가 다시 교체 되는 경우를 감안한 코드
            
            # 홈팀 선수 이벤트 업데이트 (골, 어시스트, 옐로우카드, 레드카드)
            home_event = []     # 선수 이벤트 담을 리스트
            for p in data["match"]["homeParticipant"]["events"]:
                if p['eventId'] == "1":     # 골
                    home_event.append([int(p["playerID"]), 1, 0, 0, 0])
                    home_event.append([int(p["assist"][0]["playerID"]), 0, 1, 0, 0])
                elif p['eventId'] == "4":   # 페널티 골
                    home_event.append([int(p["playerID"]), 1, 0, 0, 0])
                elif p['eventId'] == "5":   # 옐로우카드
                    home_event.append([int(p["playerID"]), 0, 0, 1, 0])
                elif p['eventId'] == "6" or "7":   # 레드카드
                    home_event.append([int(p["playerID"]), 0, 0, 0, 1])
            
            # Player 테이블에 홈팀 선수 출장시간 업데이트 
            for p_id, runtime in home_runtime:
                player = Player.objects.get(id=p_id)
                player.run_time += runtime
                player.save()
            
            # Player 테이블에 홈팀 선수 이벤트 업데이트
            for p_id, goal, assist, yellow, red in home_event:
                player = Player.objects.get(id=p_id)
                player.goal += goal
                player.assist += assist
                player.yellow_card += yellow
                player.red_card += red
                player.save()
            
            # 원정팀 선수 출장시간 업데이트
            away_runtime = []    # 선수 출장시간 담을 리스트
            for p in data["match"]["awayParticipant"]["squad"]["lineup"]:
                away_runtime.append([int(p["playerID"]), game_time])
            for s in data["match"]["awayParticipant"]["squad"]["subs"]:
                away_runtime.append([int(s["playerIN"]), game_time - int(s["minute"])])
                for player in away_runtime:
                    if player[0] == int(s["playerOUT"]):
                        player[1] -= (game_time - int(s["minute"]))     # 교체출전한 선수가 다시 교체 되는 경우를 감안한 코드
            
            # 원정팀 선수 이벤트 업데이트 (골, 어시스트, 옐로우카드, 레드카드)
            away_event = []     # 선수 이벤트 담을 리스트
            for p in data["match"]["awayParticipant"]["events"]:
                if p['eventId'] == "1":     # 골
                    away_event.append([int(p["playerID"]), 1, 0, 0, 0])
                    away_event.append([int(p["assist"][0]["playerID"]), 0, 1, 0, 0])
                elif p['eventId'] == "4":   # 페널티 골
                    away_event.append([int(p["playerID"]), 1, 0, 0, 0])
                elif p['eventId'] == "5":   # 옐로우카드
                    away_event.append([int(p["playerID"]), 0, 0, 1, 0])
                elif p['eventId'] == "6" or "7":   # 레드카드
                    away_event.append([int(p["playerID"]), 0, 0, 0, 1])
            
            # Player 테이블에 원정팀 선수 출장시간 업데이트 
            for p_id, runtime in away_runtime:
                player = Player.objects.get(id=p_id)
                player.run_time += runtime
                player.save()
            
            # Player 테이블에 원정팀 선수 이벤트 업데이트
            for p_id, goal, assist, yellow, red in away_event:
                player = Player.objects.get(id=p_id)
                player.goal += goal
                player.assist += assist
                player.yellow_card += yellow
                player.red_card += red
                player.save()



@transaction.atomic()
def uservalue():
    user=User.objects.all()

    for i in user:
        card=PlayerCard.objects.filter(Q(user_id=i.id)).distinct().values('player_id').distinct()
        num=0
        for c in card:
            player=Player.objects.get(id=c.get('player_id'))
            num+=player.value
        i.value=num
        i.save()