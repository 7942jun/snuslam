# Generated by Django 2.1.1 on 2018-11-12 22:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('snuslam', '0004_auto_20181112_2209'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ssuser',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='ssuser', to=settings.AUTH_USER_MODEL),
        ),
    ]
