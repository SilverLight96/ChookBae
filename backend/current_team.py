import requests
from secret.apikey import API_KEY

# DB에 데이터를 넣을때 필요한 모듈 및 코드
import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chookbae.settings")
django.setup()
from worldcup.models import *

# 소속팀이 없는 선수 id 불러오기
player_list = []
players = Player.objects.filter(current_team="N/A")
for p in players:
    player_list.append(p.id)

print(player_list)

# 가장 최근 소속팀 찾기
BASE_URL = 'https://api.statorium.com/api/v1/'
path = 'players/'

player_table = []
i = 0               # 코드가 돌아가는동안 시각적 표현을 위한 변수 (현재 진행 위치 표기)
for p in player_list:
    i += 1
    alert = False   # 코드가 돌아가는동안 시각적 표현을 위한 변수 (alert가 T면 updated를 출력하고, F면 현재 위치만 출력)
    player_id = str(p) + '/'
    for n in range(205, 122, -1):
        params = {
            'season_id' : n,
            'apikey': API_KEY
            }
        response = requests.get(BASE_URL+path+player_id, params=params)

        data = response.json()
        player = data['player']

        # 소속팀 결과가 나오면 DB에 반영
        if player['teams']:
            plyr = Player.objects.get(id=p)
            plyr.current_team = player['teams'][0]['teamName']
            plyr.save()
            print(i, "/", len(player_list), "-- updated!")
            alert = True
            break
    if alert == False:
        print(i, "/", len(player_list))