import requests
import operator
from datetime import datetime
import pytz
from secret.apikey import API_KEY

# DB에 데이터를 넣을때 필요한 모듈 및 코드
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chookbae.settings")
django.setup()

from worldcup.models import *  # django.setup() 이후에 임포트해야 오류가 나지 않음


############### 경기 정보 + 필요한 리스트 추출 ###############
# URL 및 요청변수 설정
BASE_URL = 'https://api.statorium.com/api/v1/'
path = 'matches/'
params = {
    'season_id' : '121',
    'apikey': API_KEY
    }

# 결과를 받아서 json형식의 data변수로 저장
response = requests.get(BASE_URL+path, params=params)
data = response.json()

# pprint.pprint(data['calendar']['matchdays'])

match_table = []            # 모든 경기 정보를 담을 빈리스트 생성
venue_set = set()           # 경기장 ID를 담을 빈셋 생성
team_set = set()            # 팀 ID를 담을 빈셋 생성
# for문을 이용해 모든 경기 순회하며 리스트에 담기
for i in range(len(data['calendar']['matchdays'])):
    if data['calendar']['matchdays'][i]['matchdayPlayoff'] == "0":
        for j in range(len(data['calendar']['matchdays'][i]['matches'])):
            match = data['calendar']['matchdays'][i]['matches'][j]
            curr_match = [int(match['matchID']), int(match['matchStatus']['statusID']), data['calendar']['matchdays'][i]['matchdayName'], int(data['calendar']['matchdays'][i]['matchdayType']),
                            int(match['homeParticipant']['participantID']), int(match['awayParticipant']['participantID']), match['matchDate'], match['matchTime'],
                            int(match['matchVenue']['venueID']), int(match['homeParticipant']['score']), int(match['awayParticipant']['score'])]
            match_table.append(curr_match)

            venue_set.add(int(data['calendar']['matchdays'][i]['matches'][j]['matchVenue']['venueID']))     # 경기장 ID 담기 (중복제거)
            team_set.add((int(data['calendar']['matchdays'][i]['matches'][j]['homeParticipant']['participantID']), data['calendar']['matchdays'][i]['matches'][j]['group']['groupName'][-1]))     # 팀 ID 담기 (홈팀, 중복제거)
            team_set.add((int(data['calendar']['matchdays'][i]['matches'][j]['awayParticipant']['participantID']), data['calendar']['matchdays'][i]['matches'][j]['group']['groupName'][-1]))     # 팀 ID 담기 (원정팀, 중복제거)

print('-'*30 + 'match table: \n', match_table)           # 경기 ID 전체 리스트

venue_list = list(venue_set)    # 경기장 ID 세트를 리스트로 변환
# print(venue_list)               # 경기장 ID 전체 리스트

team_list = sorted(list(team_set), key=operator.itemgetter(1, 0))      # 팀 ID 세트를 리스트로 변환
# print(team_list)                # 팀 ID 전체 리스트


############### 경기장 정보 ###############
venue_table = []        # 전체 경기장 정보를 담을 빈리스트 생성
# 경기장 ID 8개 순회
for v in venue_list:
    # URL 및 요청변수 설정
    BASE_URL = 'https://api.statorium.com/api/v1/'
    path = 'venues/'
    venue_id = str(v) + '/'
    params = {
        'apikey': API_KEY
        }
    
    # 결과를 받아서 json형식의 data변수로 저장
    response = requests.get(BASE_URL+path+venue_id, params=params)
    data = response.json()
    ven = data['venue']

    curr_venue = [int(ven['id']), ven['venueName'], ven['photo'], ven['venueAddress'], int(ven['additionalInfo']['capacity']), int(ven['additionalInfo']['opened'][:4])]
    venue_table.append(curr_venue)

print('-'*30 + 'venue table: \n', venue_table)


############### 팀 정보 + 선수 ID 리스트 추출 ###############
team_table = []         # 전체 팀 정보를 담을 빈리스트 생성
player_list = []        # 전체 선수 ID를 담을 빈리스트 생성
# 팀 리스트 순회
for t in team_list:
    # URL 및 요청변수 설정
    BASE_URL = 'https://api.statorium.com/api/v1/'
    path = 'teams/'
    team_id = str(t[0]) + '/'
    params = {
        'season_id' : '121',
        'apikey': API_KEY
        }
    
    # 결과를 받아서 json형식의 data변수로 저장
    response = requests.get(BASE_URL+path+team_id, params=params)
    data = response.json()
    team = data['team']

    curr_team = [int(team['teamID']), team['teamName'], team['logo'], t[1], 0, 0, 0, 0, 0, 0, '5 games', team['additionalInfo']['coach'], 0]
    team_table.append(curr_team)

    # 선수 ID 리스트에 담기
    for p in range(len(team['players'])):
        player_list.append(int(team['players'][p]['playerID']))

print('-'*30 + 'team table: \n', team_table)

############### 선수 정보 ###############
### 월드컵 API에서 제공하는 선수정보가 없는동안 해당 코드는 사용불가 (11월 2주쯤 API 업데이트 예정)
print(player_list)      # 모든 선수들의 ID를 담고있는 리스트

### 임시 선수 데이터 리스트 생성
BASE_URL = 'https://api.statorium.com/api/v1/'
path = 'teams/'
params = {
    'season_id' : '1',
    'apikey': API_KEY
    }

player_list_tmp = []
for num in [2, 10]:     # 토트넘 & 뉴캐슬 선수 추출
    team_id = str(num) + '/'
    response = requests.get(BASE_URL+path+team_id, params=params)
    data = response.json()
    team = data['team']

    for p in range(len(team['players'])):
        player_list_tmp.append(int(team['players'][p]['playerID']))

print(player_list_tmp)

### 임시 선수 테이블 생성
BASE_URL = 'https://api.statorium.com/api/v1/'
path = 'players/'
params = {
    'season_id' : '1',
    'apikey': API_KEY
    }

player_table_tmp = []
for p in player_list_tmp:
    player_id = str(p) + '/'
    response = requests.get(BASE_URL+path+player_id, params=params)

    data = response.json()
    player = data['player']

    # 참고: API에서 제공되는 국가코드(200여개 국가 대상으로 부여된 번호)는 Team 테이블의 국가 고유번호(국가대표팀을 포함한 모든 축구팀에게 부여된 번호)와 다른 번호임.
    curr_player = [int(player['playerID']), player['fullName'], player['homeName'], player['photo'], int(player['teams'][0]['playerNumber']),
                    player['additionalInfo']['birthdate'], int(player['additionalInfo']['weight'][:-3]), int(player['additionalInfo']['height'][:-3]),
                    int(player['country']['id']), #player['currentTeam']['name'],   # 월드컵 API 선수정보 나올때까지 teams -> teamName 으로 임시 대체
                    player['teams'][0]['teamName'], int(player['additionalInfo']['position']), 0, 0, 0, 0, 0, 0]
    player_table_tmp.append(curr_player)
    
print('-'*30 + 'player table(tmp): \n', player_table_tmp)



###################################################################################################
######################################### DB에 데이터 넣기 #########################################
'''
## 경기장 정보 DB에 넣기
for row in venue_table:
    print(row[0])
    id_t = row[0]
    name_t = row[1]
    image_t = row[2]
    address_t = row[3]
    capacity_t = row[4]
    opened_year_t = row[5]
    Venue.objects.create(id=id_t, venue_name=name_t, venue_image=image_t, address=address_t, capacity=capacity_t, opened_year=opened_year_t)

## 팀 정보 DB에 넣기
for row in team_table:
    print(row[0])
    id_t = row[0]
    country_t = row[1]
    logo_t = row[2]
    group_t = row[3]
    rank_t = row[4]
    win_t = row[5]
    draw_t = row[6]
    loss_t = row[7]
    points_t = row[8]
    goal_diff_t = row[9]
    last_five_t = row[10]
    manager_t = row[11]
    round_t = row[12]
    Team.objects.create(id=id_t, country=country_t, logo=logo_t, group=group_t, rank=rank_t, win=win_t, draw=draw_t, loss=loss_t,
                            points=points_t, goal_diff=goal_diff_t, last_five=last_five_t, manager=manager_t, round=round_t)

## 경기 정보 DB에 넣기 (한국시간으로 변경 후 저장)
for row in match_table:
    print(row[0])
    id_t = row[0]
    match_status_t = row[1]
    match_name_t = row[2]
    match_type_t = row[3]
    team1_id_t = row[4]
    team1_id_pk = Team.objects.get(id=team1_id_t)
    team2_id_t = row[5]
    team2_id_pk = Team.objects.get(id=team2_id_t)

    # UTC to KST
    gd = row[6]
    gt = row[7]
    match_dt = datetime(int(gd[:4]), int(gd[5:7]), int(gd[8:10]), int(gt[:2]), int(gt[3:5]), 0)     # 경기 시간을 datetime 포맷으로 변환

    UTC_time = pytz.utc
    KR_time = pytz.timezone("Asia/Seoul")

    UTC_match = UTC_time.localize(match_dt)     # 시간 변환
    KR_match = UTC_match.astimezone(KR_time)

    start_date_t = str(KR_match)[:10]
    start_time_t = str(KR_match)[11:16]

    venue_id_t = row[8]
    venue_id_pk = Venue.objects.get(id=venue_id_t)
    team1_score_t = row[9]
    team2_score_t = row[10]
    Match.objects.create(id=id_t, match_status=match_status_t, match_name=match_name_t, match_type=match_type_t,
                        team1_id=team1_id_pk, team2_id=team2_id_pk, start_date=start_date_t, start_time=start_time_t,
                        venue_id=venue_id_pk, team1_score=team1_score_t, team2_score=team2_score_t)

## 선수 정보 DB에 넣기
for row in player_table_tmp:
    print(row[0])
    id_t = row[0]
    fullname_t = row[1]
    homename_t = row[2]
    player_image_t = row[3]
    number_t = row[4]
    birthday_t = row[5]
    weight_t = row[6]
    height_t = row[7]
    # team_id_t = row[8]                            # 임시 선수 데이터에서는 사용 불가
    # team_id_pk = Team.objects.get(id=team_id_t)   # 임시 선수 데이터에서는 사용 불가
    team_id_pk = Team.objects.get(id=434) #int(row[8])                        # 임시 선수 데이터일때 대체 코드
    current_team_t = row[9]
    position_t = row[10]
    goal_t = row[11]
    assist_t = row[12]
    yellow_card_t = row[13]
    red_card_t = row[14]
    run_time_t = row[15]
    value_t = row[16]
    Player.objects.create(id=id_t, fullname=fullname_t, homename=homename_t, player_image=player_image_t, number=number_t,
                            birthday=birthday_t, weight=weight_t, height=height_t, team_id=team_id_pk, current_team=current_team_t,
                            position=position_t, goal=goal_t, assist=assist_t, yellow_card=yellow_card_t, red_card=red_card_t,
                            run_time=run_time_t, value=value_t)
'''