import os

import environ
from app.settings.base import *  # noqa

env = environ.Env(DEBUG=(bool, False))
# reading .env file
environ.Env.read_env(env_file=os.path.join(BASE_DIR, "../.env"))  # noqa


# False if not in env
DEBUG = env("DEBUG")
SECRET_KEY = env("SECRET_KEY")
ALLOWED_HOSTS = []


MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")  # noqa
