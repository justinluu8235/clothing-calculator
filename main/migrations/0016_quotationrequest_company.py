# Generated by Django 4.1.5 on 2023-12-13 23:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0015_clientcompany_website'),
    ]

    operations = [
        migrations.AddField(
            model_name='quotationrequest',
            name='company',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to='main.clientcompany'),
            preserve_default=False,
        ),
    ]
