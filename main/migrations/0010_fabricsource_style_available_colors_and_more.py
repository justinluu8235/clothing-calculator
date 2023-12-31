# Generated by Django 4.1.5 on 2023-12-12 01:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_stylesource_alter_styleimage_image_style_source'),
    ]

    operations = [
        migrations.CreateModel(
            name='FabricSource',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('source_name', models.CharField(blank=True, max_length=250)),
            ],
        ),
        migrations.AddField(
            model_name='style',
            name='available_colors',
            field=models.CharField(blank=True, max_length=250),
        ),
        migrations.AddField(
            model_name='style',
            name='fabric_composition',
            field=models.CharField(blank=True, max_length=250),
        ),
        migrations.AddField(
            model_name='style',
            name='fabric_source',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='fabric_source', to='main.fabricsource'),
        ),
    ]
