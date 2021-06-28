from django.urls import path
from users.views import FindSlotView, RegisterView, Unsubscribe

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("slots/", FindSlotView.as_view(), name="slots"),
    path("unsubscribe/<id>/", Unsubscribe.as_view(), name="unsubscribe"),
]
