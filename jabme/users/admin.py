from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from users.forms import CustomUserChangeForm, CustomUserCreationForm
from users.models import User


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = (
        "__str__",
        "email",
        "pincode",
        "district",
        "is_staff",
        "is_active",
    )
    list_filter = (
        "pincode",
        "district",
        "email",
        "is_staff",
        "is_active",
    )
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "password",
                )
            },
        ),
        ("Personal Info", {"fields": ("name", "dateJoined")}),
        (
            "Details",
            {
                "fields": (
                    "pincode",
                    "district",
                    "district_id",
                    "age_category",
                    "fcm_token",
                    "email_send_time",
                )
            },
        ),
        ("Permissions", {"fields": ("is_superuser", "is_staff", "is_active")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "name",
                    "pincode",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)


admin.site.register(User, CustomUserAdmin)
admin.site.unregister(Group)
