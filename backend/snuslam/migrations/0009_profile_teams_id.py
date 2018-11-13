# Generated by Django 2.1.1 on 2018-11-13 11:43

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('snuslam', '0008_remove_tournament_result'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='teams_id',
            field=models.ManyToManyField(related_name='profile_teams', to=settings.AUTH_USER_MODEL),
        ),
    ]
