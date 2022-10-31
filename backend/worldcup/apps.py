from django.apps import AppConfig


class WorldcupConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'worldcup'

    def ready(self):
        from . import updater
        updater.start()
