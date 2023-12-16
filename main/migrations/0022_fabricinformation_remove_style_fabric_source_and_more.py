# Generated by Django 4.1.5 on 2023-12-16 21:59

from django.db import migrations, models
import django.db.models.deletion
import main.models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0021_alter_clientcompany_user_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='FabricInformation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(blank=True, max_length=250)),
                ('color_swatch_image', models.FileField(blank=True, null=True, upload_to=main.models.style_image_upload_to)),
            ],
        ),
        migrations.RemoveField(
            model_name='style',
            name='fabric_source',
        ),
        migrations.DeleteModel(
            name='FabricSource',
        ),
        migrations.AddField(
            model_name='style',
            name='fabric_information',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='fabric_source', to='main.fabricinformation'),
        ),
    ]