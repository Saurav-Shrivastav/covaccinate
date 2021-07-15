import json
import re
import threading
from datetime import date, datetime, timedelta

import requests
import six
from django.contrib.auth import get_user_model
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.db import models
from django.db.models import Q
from django.db.models.functions import Now
from django.shortcuts import render
from django.template import Context, loader
from django.utils import timezone
from django.utils.decorators import method_decorator
from fake_useragent import UserAgent
from rest_framework.response import Response
from rest_framework.views import APIView
from users.decorators import validate_header
from users.models import District

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
                try:
                    dist = District.objects.get(
                        district_id=data["district_id"]
                    )
                except Exception:
                    dist = District.objects.create(
                        district_id=data["district_id"],
                        district=data["district"],
                    )
                user.district = dist
                user.age_category = data["category"]
                if "fcm_token" in data:
                    user.fcm_token = data["fcm_token"]
                user.save()
            except Exception:
                return Response("Exception occured, enter correct data")

        return Response("Registered Successfully")


@method_decorator(validate_header, name="get")
class FindSlotView(APIView):
    def get(self, request):
        time_threshold = datetime.now(timezone.utc) - timedelta(
            hours=5, minutes=50
        )
        district_ids = (
            District.objects.filter(
                Q(email_send_time__lt=time_threshold)
                | Q(email_send_time__isnull=True),
            )
            .values("district_id")
            .annotate(n=models.Count("pk"))
        )
        user_agent = UserAgent()
        today = date.today().strftime("%d-%m-%Y")
        result = []
        for district in district_ids:
            four5 = []
            eighteen = []
            headers = {"User-Agent": user_agent.random}
            url = f"https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id={district['district_id']}&date={today}"
            try:
                r = requests.get(url, headers=headers).text
            except Exception:
                print(
                    "Exception Occurred while fetching: ",
                    district["district_id"],
                )
                continue
            r = json.loads(r)
            if "centers" in r:
                for center in r["centers"]:
                    for session in center["sessions"]:
                        if (
                            session["min_age_limit"] == 45
                            and session["available_capacity"] > 0
                        ):
                            four5.append(
                                {
                                    "name": center["name"],
                                    "date": session["date"],
                                    "slots": session["slots"],
                                    "vaccine": session["vaccine"],
                                    "availability": session[
                                        "available_capacity"
                                    ],
                                    "address": center["address"],
                                    "block_name": center["block_name"],
                                    "fee_type": center["fee_type"],
                                    "min_age_limit": session["min_age_limit"],
                                }
                            )
                        elif (
                            session["min_age_limit"] == 18
                            and session["available_capacity"] > 0
                        ):
                            eighteen.append(
                                {
                                    "name": center["name"],
                                    "date": session["date"],
                                    "slots": session["slots"],
                                    "vaccine": session["vaccine"],
                                    "availability": session[
                                        "available_capacity"
                                    ],
                                    "address": center["address"],
                                    "block_name": center["block_name"],
                                    "fee_type": center["fee_type"],
                                    "min_age_limit": session["min_age_limit"],
                                }
                            )
            else:
                break
            emails45 = User.objects.filter(
                district__district_id=district["district_id"],
                age_category="45+",
            ).values("email", "name")
            emails1844 = User.objects.filter(
                district__district_id=district["district_id"],
                age_category="18-44",
            ).values("email", "name")
            if eighteen or four5:
                if eighteen and four5:
                    if emails1844.exists() and emails45.exists():
                        result.append(
                            {
                                "district_id": district["district_id"],
                                "emails45+": emails45,
                                "data45+": four5,
                                "emails18-44": emails1844,
                                "data18-44": eighteen,
                            }
                        )
                    elif emails1844.exists() and not emails45.exists():
                        result.append(
                            {
                                "district_id": district["district_id"],
                                "emails18-44": emails1844,
                                "data18-44": eighteen,
                            }
                        )
                    elif emails45.exists() and not emails1844.exists():
                        result.append(
                            {
                                "district_id": district["district_id"],
                                "emails45+": emails45,
                                "data45+": four5,
                            }
                        )
                elif eighteen and not four5:
                    if emails1844.exists():
                        result.append(
                            {
                                "district_id": district["district_id"],
                                "emails18-44": emails1844,
                                "data18-44": eighteen,
                            }
                        )
                elif four5 and not eighteen:
                    if emails45.exists():
                        result.append(
                            {
                                "district_id": district["district_id"],
                                "emails45+": emails45,
                                "data45+": four5,
                            }
                        )

        return Response(result)


@method_decorator(validate_header, name="post")
class UpdateEmailSentTime(APIView):
    def post(self, request):
        now = Now()
        for dist in request.data["district_ids"]:
            try:
                District.objects.filter(district_id=dist).update(
                    email_send_time=now
                )
            except Exception:
                print("Time could not be updated for ", dist, Exception)
        return Response("Done hehe.")


class SubscriptionDeleteTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.pk)
            + six.text_type(user.pincode)
            + six.text_type(user.password)
        )


subscription_delete_token = SubscriptionDeleteTokenGenerator()


class SubscriptionDeleteRequestView(APIView):
    def post(self, request):
        try:
            user = User.objects.get(email=request.data["email"])
        except User.DoesNotExist:
            return Response("User does not exist for this email.")

        token = subscription_delete_token.make_token(user)
        url = request.build_absolute_uri() + str(user.pk) + "/" + token + "/"
        message = loader.get_template("mail-message.txt").render(
            {"name": user.name, "url": url}
        )
        send_mail(
            "Unsubscribe Request!",
            message,
            "Covaccinate Support <notification@saurav.covaccinate.tech>",
            [user.email],
        )
        return Response("Please check your email to confirm.")


class SubscriptionDeleteView(APIView):
    def get(self, request, uuid, token):
        try:
            user = User.objects.get(pk=uuid)
        except User.DoesNotExist:
            user = None

        print(subscription_delete_token.check_token(user, token))

        if user is not None and subscription_delete_token.check_token(
            user, token
        ):
            user.delete()
            return render(request, "unsubscribed.html")
        else:
            return render(request, "unsubscribe_invalid.html")
