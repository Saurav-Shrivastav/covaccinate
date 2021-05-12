from django.urls import path

from users.views import FindSlotView, RegisterView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("slots/", FindSlotView.as_view(), name="slots"),
]
