import os

from jabme.app.settings.base import *  # noqa

SECRET_KEY = os.environ.get(
    "DJANGO_SECRET_KEY", "p7g_g$a7^qfn!zxc&h+fbvy*0+@trz7)pkr#54elu!1u#rg@tq"
)
DEBUG = os.environ.get("DJANGO_DEBUG", "") != "False"
ALLOWED_HOSTS = []


STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"
