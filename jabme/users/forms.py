from django.contrib.auth.forms import UserChangeForm, UserCreationForm

from .models import User


# subclass the UserCreationForm and UserChangeForm forms
# so that they use the new Custom-User model.
class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = User
        fields = ("email",)


class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm):
        model = User
        fields = ("email",)
