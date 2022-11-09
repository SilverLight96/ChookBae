from .views import predictcalc, playerValueUpdate, matchUpdate
from apscheduler.schedulers.background import BackgroundScheduler

# 자동화 시스템
def start():
    scheduler = BackgroundScheduler(timezone='Asia/Seoul')
    scheduler.add_job(predictcalc, 'cron', hour='12')
    scheduler.add_job(playerValueUpdate, 'cron', hour='12')             # 선수 시세
    scheduler.add_job(matchUpdate, 'cron', second='0', hour='10')    # 경기 결과 및 실시간 스코어 정보
    scheduler.add_job(matchUpdate, 'cron', second='0', hour='18-23')    # 경기 결과 및 실시간 스코어 정보
    scheduler.add_job(matchUpdate, 'cron', second='0', hour='00-07')    # 경기 결과 및 실시간 스코어 정보
    scheduler.start()