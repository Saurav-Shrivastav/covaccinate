from django.urls import path

from jabme.users.views import RegisterView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
]
