# Generated by Django 4.1.5 on 2023-12-13 02:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0013_clientcompany_quotationrequest'),
    ]

    operations = [
        migrations.AddField(
            model_name='clientcompany',
            name='city',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='clientcompany',
            name='state',
            field=models.CharField(blank=True, max_length=200),
        ),
        migrations.AddField(
            model_name='clientcompany',
            name='zip_code',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]
