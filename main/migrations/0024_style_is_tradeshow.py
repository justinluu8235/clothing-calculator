# Generated by Django 4.1.5 on 2023-12-17 22:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0023_remove_style_fabric_information_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='style',
            name='is_tradeshow',
            field=models.BooleanField(default=False),
        ),
    ]
