import os

from app.settings.base import *  # noqa

print(os.environ.get("SECRET_KEY"), os.environ.get("DEBUG"))

SECRET_KEY = os.environ.get(
    "SECRET_KEY", "p7g_g$a7^qfn!zxc&h+fbvy*0+@trz7)pkr#54elu!1u#rg@tq"
)
DEBUG = int(os.environ.get("DEBUG", default=0))
ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS").split(" ")


STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"
