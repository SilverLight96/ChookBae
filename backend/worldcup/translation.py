##### 한글 번역 함수  #####


### 경기장 정보
def venue_k(id):
    k_venue = [
        {"id": 710,"k_name": "아흐마드 빈 알리 스타디움", "k_address": "카타르 알 라얀",},
        {"id": 712,"k_name": "알 자누브 스타디움", "k_address": "카타르 알 와크라",},
        {"id": 1163,"k_name": "알 바이트 스타디움", "k_address": "카타르 알 코르",},
        {"id": 1164,"k_name": "루사일 스타디움", "k_address": "카타르 루사일",},
        {"id": 1165,"k_name": "스타디움 974", "k_address": "카타르 도하",},
        {"id": 1166,"k_name": "칼리파 국제 경기장", "k_address": "카타르 도하",},
        {"id": 1167,"k_name": "에듀케이션 시티 스타디움", "k_address": "카타르 알 라얀",},
        {"id": 1168,"k_name": "알 투마마 스타디움", "k_address": "카타르 도하",},
    ]
    for kv in k_venue:
        if kv["id"] == id:
            return [kv["k_name"], kv["k_address"]]


### 팀 정보
def team_k(id):
    k_team = [
        {"id": 434, "countryName": "Qatar", "countryNameKR": "카타르",},
        {"id": 436, "countryName": "Ecuador", "countryNameKR": "에콰도르",},
        {"id": 1066, "countryName": "Senegal", "countryNameKR": "세네갈",},
        {"id": 385, "countryName": "Netherlands", "countryNameKR": "네덜란드",},
        {"id": 381, "countryName": "England", "countryNameKR": "잉글랜드",},
        {"id": 1227, "countryName": "Iran", "countryNameKR": "이란",},
        {"id": 1243, "countryName": "USA", "countryNameKR": "미국",},
        {"id": 394, "countryName": "Wales", "countryNameKR": "웨일스",},
        {"id": 427, "countryName": "Argentina", "countryNameKR": "아르헨티나",},
        {"id": 1237, "countryName": "Saudi Arabia", "countryNameKR": "사우디 아라비아",},
        {"id": 1244, "countryName": "Mexico", "countryNameKR": "멕시코",},
        {"id": 386, "countryName": "Poland", "countryNameKR": "폴란드",},
        {"id": 383, "countryName": "France", "countryNameKR": "프랑스",},
        {"id": 428, "countryName": "Australia", "countryNameKR": "호주",},
        {"id": 380, "countryName": "Denmark", "countryNameKR": "덴마크",},
        {"id": 1046, "countryName": "Tunisia", "countryNameKR": "튀니지",},
        {"id": 389, "countryName": "Spain", "countryNameKR": "스페인",},
        {"id": 1278, "countryName": "Costa Rica", "countryNameKR": "코스타리카",},
        {"id": 384, "countryName": "Germany", "countryNameKR": "독일",},
        {"id": 1236, "countryName": "Japan", "countryNameKR": "일본",},
        {"id": 377, "countryName": "Belgium", "countryNameKR": "벨기에",},
        {"id": 1242, "countryName": "Canada", "countryNameKR": "캐나다",},
        {"id": 1071, "countryName": "Morocco", "countryNameKR": "모로코",},
        {"id": 378, "countryName": "Croatia", "countryNameKR": "크로아티아",},
        {"id": 426, "countryName": "Brazil", "countryNameKR": "브라질",},
        {"id": 670, "countryName": "Serbia", "countryNameKR": "세르비아",},
        {"id": 391, "countryName": "Switzerland", "countryNameKR": "스위스",},
        {"id": 1055, "countryName": "Cameroon", "countryNameKR": "카메룬",},
        {"id": 387, "countryName": "Portugal", "countryNameKR": "포르투갈",},
        {"id": 1063, "countryName": "Ghana", "countryNameKR": "가나",},
        {"id": 430, "countryName": "Uruguay", "countryNameKR": "우루과이",},
        {"id": 1235, "countryName": "Korea Republic", "countryNameKR": "대한민국",},
    ]
    for kt in k_team:
        if kt["id"] == id:
            return kt["countryNameKR"]


### 선수 포지션
def player_pos(num):
    pos_player = [
        {"position": "1", "pos": "GK"},
        {"position": "2", "pos": "DF"},
        {"position": "3", "pos": "MF"},
        {"position": "4", "pos": "FW"},
    ]
    for pp in pos_player:
        if pp["position"] == num:
            return pp["pos"]


### 선수 정보
def player_k(id):
    k_player = [
        {"id": 29, "fullNameKR": "휴고 요리스",},
        {"id": 30, "fullNameKR": "미셸 봄",},
        {"id": 31, "fullNameKR": "토비 올더베이럴드",},
        {"id": 32, "fullNameKR": "세르게 오리에",},
        {"id": 33, "fullNameKR": "벤 데이비스",},
        {"id": 34, "fullNameKR": "대니 로즈",},
        {"id": 35, "fullNameKR": "다빈슨 산체스",},
        {"id": 36, "fullNameKR": "키런 트리피어",},
        {"id": 37, "fullNameKR": "얀 베르통언",},
        {"id": 38, "fullNameKR": "카일 워커-피터스",},
        {"id": 39, "fullNameKR": "델레 알리",},
        {"id": 40, "fullNameKR": "크리스티안 에릭센",},
        {"id": 41, "fullNameKR": "에릭 다이어",},
        {"id": 42, "fullNameKR": "에릭 라멜라",},
        {"id": 43, "fullNameKR": "루카스 모우라",},
        {"id": 44, "fullNameKR": "무사 시소코",},
        {"id": 45, "fullNameKR": "해리 윙크스",},
        {"id": 46, "fullNameKR": "해리 케인",},
        {"id": 47, "fullNameKR": "페르난도 요렌테",},
        {"id": 48, "fullNameKR": "손흥민",},
        {"id": 49, "fullNameKR": "루크 아모스",},
        {"id": 50, "fullNameKR": "파울로 가자니가",},
        {"id": 51, "fullNameKR": "빅터 완야마",},
        {"id": 52, "fullNameKR": "후안 포이스",},
        {"id": 53, "fullNameKR": "알피 화이트맨",},
        {"id": 54, "fullNameKR": "올리버 스키프",},
        {"id": 55, "fullNameKR": "티모시 에요마",},
        {"id": 56, "fullNameKR": "조지 마쉬",},
        {"id": 561, "fullNameKR": "무사 뎀벨레",},
        {"id": 605, "fullNameKR": "조르주 케빈 은쿠두",},
        {"id": 608, "fullNameKR": "카자이 스털링",},
        {"id": 3677, "fullNameKR": "빈센트 얀센",},
        {"id": 259, "fullNameKR": "카를 달로",},
        {"id": 260, "fullNameKR": "마르틴 두브라브카",},
        {"id": 261, "fullNameKR": "시아란 클라크",},
        {"id": 262, "fullNameKR": "폴 더밋",},
        {"id": 263, "fullNameKR": "자말 라셀레스",},
        {"id": 264, "fullNameKR": "하비에르 만키요",},
        {"id": 265, "fullNameKR": "파비안 셰르",},
        {"id": 266, "fullNameKR": "드 안드레 예들린",},
        {"id": 267, "fullNameKR": "크리스티안 아쓰",},
        {"id": 268, "fullNameKR": "모하메드 디아메",},
        {"id": 269, "fullNameKR": "기성용",},
        {"id": 270, "fullNameKR": "켄디",},
        {"id": 271, "fullNameKR": "맷 리치",},
        {"id": 272, "fullNameKR": "존조 셸비",},
        {"id": 273, "fullNameKR": "아요제 페레스",},
        {"id": 274, "fullNameKR": "호세루",},
        {"id": 275, "fullNameKR": "무토 요시노리",},
        {"id": 276, "fullNameKR": "살로몬 론돈",},
        {"id": 277, "fullNameKR": "페데리코 페르난데스",},
        {"id": 278, "fullNameKR": "아이작 헤이든",},
        {"id": 279, "fullNameKR": "숀 롱스태프",},
        {"id": 280, "fullNameKR": "롭 엘리엇",},
        {"id": 281, "fullNameKR": "플로리안 르준",},
        {"id": 282, "fullNameKR": "프레디 우드먼",},
        {"id": 284, "fullNameKR": "안토니오 바레카",},
        {"id": 285, "fullNameKR": "미겔 알미론",},
        {"id": 585, "fullNameKR": "제이콥 머피",},
        {"id": 591, "fullNameKR": "제이미 스테리",},
        {"id": 607, "fullNameKR": "캘럼 로버츠",},
        {"id": 3691, "fullNameKR": "켈 와츠",},
        {"id": 3692, "fullNameKR": "루이스 카스",},
    ]
    for kp in k_player:
        if kp["id"] == id:
            return kp["fullNameKR"]