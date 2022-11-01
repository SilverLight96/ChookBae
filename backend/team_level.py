import requests
from secret.apikey import API_KEY
import pandas as pd


# DB에 데이터를 넣을때 필요한 모듈 및 코드
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chookbae.settings")
django.setup()

from worldcup.models import *  # django.setup() 이후에 임포트해야 오류가 나지 않음


############### 팀 정보 추출 ###############
# URL 및 요청변수 설정
BASE_URL = 'https://api.statorium.com/api/v1/'
path = 'teams/'
params = {
    'season_id' : '121',
    'apikey': API_KEY
    }

teams = []
# 결과를 받아서 리스트에 저장
for t in range(1, 300):
    team_id = str(t) + '/'
    response = requests.get(BASE_URL+path+team_id, params=params)
    data = response.json()

    if data:
        curr_team = [t, "", "", data['team']['teamName'], data['team']['logo']]
        teams.append(curr_team)

        print(t)

# print(teams)


df = pd.DataFrame(teams, columns=['pk', 'weight', 'league', 'team_name', 'logo'])
df.to_csv('teams.csv', encoding='utf-8-sig', index=False)