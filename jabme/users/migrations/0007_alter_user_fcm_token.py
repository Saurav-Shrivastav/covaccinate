# Generated by Django 3.2.2 on 2021-05-21 08:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0006_user_fcm_token"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="fcm_token",
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
