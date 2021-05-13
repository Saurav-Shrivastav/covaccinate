import uuid

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from users.managers import UserManager

PINCODE_REGEX = "^[1-9][0-9]{5}$"


class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom User model.
    """

    AGE_CHOICES = (("18-44", "18-44"), ("45+", "45+"))

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
    district = models.CharField(max_length=150)
    district_id = models.CharField(max_length=5)
    age_category = models.CharField(max_length=5, choices=AGE_CHOICES)
    name = models.CharField("Name", max_length=20)
    dateJoined = models.DateTimeField(default=timezone.now)
    fcm_token = models.CharField(max_length=100, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "name",
        "pincode",
        "district",
        "district_id",
        "age_category",
    ]

    objects = UserManager()

    def __str__(self):
        return f"{self.name}"
