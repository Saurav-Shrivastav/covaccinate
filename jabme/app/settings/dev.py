import os

import environ
from app.settings.base import *  # noqa

env = environ.Env()
# reading .env file
environ.Env.read_env(env_file=os.path.join(BASE_DIR, "../.env.dev"))  # noqa


# False if not in env
DEBUG = int(env("DEBUG"))
SECRET_KEY = env("SECRET_KEY")
ALLOWED_HOSTS = []


MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")  # noqa


LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "root": {"level": "INFO", "handlers": ["file"]},
    "handlers": {
        "file": {
            "level": "INFO",
            "class": "logging.FileHandler",
            "filename": "django.log",
            "formatter": "app",
        },
    },
    "loggers": {
        "django": {"handlers": ["file"], "level": "INFO", "propagate": True},
    },
    "formatters": {
        "app": {
            "format": (
                u"%(asctime)s [%(levelname)-8s] "
                "(%(module)s.%(funcName)s) %(message)s"
            ),
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
    },
}
