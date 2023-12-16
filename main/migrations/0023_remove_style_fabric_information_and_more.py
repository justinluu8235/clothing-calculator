# Generated by Django 4.1.5 on 2023-12-16 22:05

from django.db import migrations, models
import django.db.models.deletion
import main.models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0022_fabricinformation_remove_style_fabric_source_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='style',
            name='fabric_information',
        ),
        migrations.AddField(
            model_name='fabricinformation',
            name='style',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='fabric_information', to='main.style'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='fabricinformation',
            name='color_swatch_image',
            field=models.FileField(blank=True, null=True, upload_to=main.models.fabric_image_upload_to),
        ),
    ]
