from .views import predictcalc, playerValueUpdate, matchUpdate, uservalue
from apscheduler.schedulers.background import BackgroundScheduler

# 자동화 시스템
def start():
    scheduler = BackgroundScheduler(timezone='Asia/Seoul')
    scheduler.add_job(predictcalc, 'cron', hour='12')
    scheduler.add_job(uservalue, 'cron', hour='12')
    scheduler.add_job(playerValueUpdate, 'cron', minute='59', hour='11')             # 선수 시세
    scheduler.add_job(playerValueUpdate, 'cron', minute='55', hour='9')             # 선수 시세
    scheduler.add_job(matchUpdate, 'cron', second='0', minute='0-59', hour='18-23')    # 경기 결과 및 실시간 스코어 정보
    scheduler.add_job(matchUpdate, 'cron', second='0', minute='0-59', hour='00-07')    # 경기 결과 및 실시간 스코어 정보
    scheduler.start()
