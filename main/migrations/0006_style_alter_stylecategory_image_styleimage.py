# Generated by Django 4.1.5 on 2023-11-18 04:54

from django.db import migrations, models
import django.db.models.deletion
import main.models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_stylecategory_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Style',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
                ('description', models.CharField(blank=True, max_length=250, null=True)),
                ('notes', models.CharField(blank=True, max_length=250, null=True)),
                ('washing_instructions', models.CharField(blank=True, max_length=1000, null=True)),
            ],
        ),
        migrations.AlterField(
            model_name='stylecategory',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to=main.models.style_category_image_upload_to),
        ),
        migrations.CreateModel(
            name='StyleImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.FileField(blank=True, null=True, upload_to=main.models.style_category_image_upload_to)),
                ('style', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='main.style')),
            ],
        ),
    ]
