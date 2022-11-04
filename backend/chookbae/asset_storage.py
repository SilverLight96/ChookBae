from storages.backends.s3boto3 import S3Boto3Storage
from django.conf import settings
#s3에 저장하기 위한 클래스
class MediaStorage(S3Boto3Storage):
    location = 'static'
    file_overwrite = False


