from django.db import models

# Create your models here.

class QuantityRange(models.Model):
    start_quantity = models.IntegerField()
    end_quantity = models.IntegerField()


class FabricType(models.Model):
    fabric_name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return self.fabric_name


class StyleCategory(models.Model):
    style_category_name = models.CharField(max_length=100, null=False)


SIZE_CHOICES = [('x-small', "x-small"), ('small', 'small'), ('medium', 'medium'), ('large', 'large'), ('x-large', 'x-large')]
class StylePricePoint(models.Model):
    style_category = models.ForeignKey(StyleCategory, on_delete=models.CASCADE)
    fabric_type = models.ForeignKey(FabricType, on_delete=models.CASCADE)
    quantity_range = models.ForeignKey(QuantityRange, on_delete=models.CASCADE)
    size = models.CharField(max_length=100, choices=SIZE_CHOICES, null=False)


