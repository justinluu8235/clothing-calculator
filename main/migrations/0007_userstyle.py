# Generated by Django 4.1.5 on 2023-11-18 04:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0006_style_alter_stylecategory_image_styleimage'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserStyle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('style', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.style')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='styles', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
