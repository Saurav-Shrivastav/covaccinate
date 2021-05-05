import re

from django.contrib.auth import get_user_model
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

PINCODE_REGEX = "^[1-9][0-9]{5}$"
User = get_user_model()


def validate_pincode(pin):
    reg = re.compile(PINCODE_REGEX)
    if not reg.match(pin):
        raise ValidationError("Enter correct pincode")


class RegisterView(APIView):
    def post(self, request):
        data = request.data

        try:
            user = User.objects.get(email=data["email"])
            return Response("Email Already exists.")
        except Exception:
            user = User()
            try:
                validate_pincode(data["pincode"])
            except Exception:
                return Response("Incorrect pincode")
            try:
                user.password = make_password(
                    BaseUserManager().make_random_password()
                )
                user.email = data["email"]
                user.name = data["name"]
                user.pincode = data["pincode"]
                user.district = data["district"]
                user.save()
            except Exception:
                return Response("Exception occured, enter correct data")

        return Response("Registered Successfully")
