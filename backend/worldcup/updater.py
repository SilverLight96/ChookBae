from .views import predictcalc
from apscheduler.schedulers.background import BackgroundScheduler




def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(predictcalc, 'cron', hour='12')
    scheduler.start()
