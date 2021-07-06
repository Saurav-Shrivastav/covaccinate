from django.urls import path
from users import views

urlpatterns = [
    path("register/", views.RegisterView.as_view(), name="register"),
    path("slots/", views.FindSlotView.as_view(), name="slots"),
    path(
        "update-lastsent/",
        views.UpdateEmailSentTime.as_view(),
        name="update_times",
    ),
    path(
        "unsubscribe/",
        views.SubscriptionDeleteRequestView.as_view(),
        name="unsubscribe",
    ),
    path(
        "unsubscribe/<uuid>/<token>/",
        views.SubscriptionDeleteView.as_view(),
        name="unsubscribe",
    ),
]
