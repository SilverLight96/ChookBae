# ⚽축배: 월드컵 정보 제공 서비스🏆

##### SSAFY 7기 자율 프로젝트

> 월드컵 API를 받아와서 경기 및 선수 정보를 제공하고, 선수 카드를 활용한 게이미피케이션 서비스



### :crown: Team A202

팀장: 성지훈

팀원: 강경은, 김수환, 박상수, 이종은, 임수환



---

### Django 실행방법

1. venv 가상환경 생성 (backend 폴더 안에서 생성하기 `cd backend`)
   `python -m venv venv`
2. venv 가상환경 실행 (tab키로 자동완성 가능)
   `source venv/Scripts/activate`
3. 터미널에 (venv)로 가상환경 진입된 것 확인
4. 기본 라이브러리 install (requirements.txt 활용)
   `pip install -r requirements.txt`
5. 프로젝트 실행
   `python manage.py runserver`



### application 생성

1. 원하는 앱 이름으로 코드 실행
   `python manage.py startapp <app 이름>`
2. urls, templates 필요시 따로 생성
   `app_name = '(app 이름)'`: 양식은 chookbae/apps.py 참고
   `templates\(app이름)` 폴더 생성 후, 그 안에 index.html 생성, 양식은 base.html 참고
   1. 프로젝트 폴더의 `settings.py`에 INSTALLED_APPS에 앱 이름 추가
   2. 프로젝트 폴더의 `urls.py`에 해당 app의 path 연결
3. `python manage.py runserver`해서 페이지 제대로 뜨는지 확인
