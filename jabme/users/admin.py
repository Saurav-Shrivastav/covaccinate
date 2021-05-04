from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group

from jabme.users.forms import CustomUserChangeForm, CustomUserCreationForm
from jabme.users.models import User


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ("__str___", "email", "pincode", "is_staff", "is_active")
    list_filter = (
        "pincode",
        "email",
        "is_staff",
        "is_active",
        "activePlan",
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
        ("Personal Info", {"fields": ("name", "mobile", "dateJoined")}),
        ("Details", {"fields": ("pincode", "district")}),
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
