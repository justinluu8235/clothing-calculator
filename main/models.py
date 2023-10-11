from django.db import models

# Create your models here.

class QuantityRange(models.Model):
    start_quantity = models.IntegerField()
    end_quantity = models.IntegerField()
