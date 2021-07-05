from django.urls import path
from users.views import FindSlotView, RegisterView, UpdateEmailSentTime

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("slots/", FindSlotView.as_view(), name="slots"),
    path(
        "update-lastsent/", UpdateEmailSentTime.as_view(), name="update_times"
    ),
]
