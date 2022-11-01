from .views import predictcalc
from apscheduler.schedulers.background import BackgroundScheduler




def start():
    scheduler = BackgroundScheduler(timezone='Asia/Seoul')
    scheduler.add_job(predictcalc, 'cron', hour='12')
    scheduler.start()
