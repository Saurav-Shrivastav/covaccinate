import uuid

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from jabme.users.managers import UserManager

PINCODE_REGEX = "^[1-9][0-9]{5}$"


class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom User model.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(
        max_length=255, unique=True, verbose_name="email address"
    )
    pincode = models.CharField(
        max_length=6,
        validators=[
            RegexValidator(
                regex=PINCODE_REGEX,
                message=_("Enter a valid pincode"),
                code="inavlid_pincode",
            )
        ],
    )
    district = models.CharField(max_length=150, blank=True, null=True)
    name = models.CharField("Name", max_length=20)
    dateJoined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "name",
        "pincode",
        "district",
    ]

    objects = UserManager()

    def __str__(self):
        return f"{self.name}"
