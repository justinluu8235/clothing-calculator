# Generated by Django 4.1.5 on 2023-12-14 02:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0018_alter_style_fabric_source_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='clientcompany',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='company', to=settings.AUTH_USER_MODEL),
        ),
    ]
