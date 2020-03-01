# Generated by Django 3.0.3 on 2020-03-01 17:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [("users", "0001_initial"), ("rooms", "0001_initial")]

    operations = [
        migrations.AddField(
            model_name="booking",
            name="customer",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="booking",
                to="users.Customer",
            ),
        ),
        migrations.AddField(
            model_name="booking",
            name="room",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT,
                related_name="booking",
                to="rooms.Room",
            ),
        ),
    ]
