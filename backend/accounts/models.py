from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
from secret.apikey import API_KEY
from django.conf import settings
def profile_image_path(instance, filename):
    return f'user/{instance.pk}/{filename}'
    # return f'/user/{instance.pk}/{filename}'


class User(AbstractBaseUser):
    nickname = models.CharField(max_length=11, blank=True)
    profile_image = ProcessedImageField(
        upload_to=profile_image_path,
        processors=[ResizeToFill(250, 250)],
        format='PNG',
        options={'quality': 100},
        null=True, 
        blank=True,
        default='user/default.png'
    )
    email = models.EmailField(max_length=50, null=False)
    is_active = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    points = models.IntegerField(default=0)
    value = models.IntegerField(default=0)
    login_count = models.IntegerField(default=0)
