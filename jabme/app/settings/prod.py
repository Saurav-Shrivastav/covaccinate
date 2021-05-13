import os

import dj_database_url
from app.settings.base import *  # noqa

SECRET_KEY = os.environ.get(
    "DJANGO_SECRET_KEY", "p7g_g$a7^qfn!zxc&h+fbvy*0+@trz7)pkr#54elu!1u#rg@tq"
)
DEBUG = os.environ.get("DJANGO_DEBUG", "") != "False"
ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS").split(" ")


STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"

# database config
db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES["default"].update(db_from_env)  # noqa
