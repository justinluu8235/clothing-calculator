from django.db import models

# Create your models here.

class QuantityRange(models.Model):
    start_quantity = models.IntegerField()
    end_quantity = models.IntegerField()
    class Meta:
        unique_together = ('start_quantity', 'end_quantity')

    def __str__(self):
        return f'{self.start_quantity} - {self.end_quantity}'


class FabricType(models.Model):
    fabric_name = models.CharField(max_length=100, null=False, unique=True)

    def __str__(self):
        return self.fabric_name


class StyleCategory(models.Model):
    style_category_name = models.CharField(max_length=100, null=False, unique=True)

    def __str__(self):
        return self.style_category_name


SIZE_CHOICES = [('x-small', "x-small"), ('small', 'small'), ('medium', 'medium'), ('large', 'large'), ('x-large', 'x-large')]
class StylePricePoint(models.Model):
    style_category = models.ForeignKey(StyleCategory, on_delete=models.CASCADE)
    fabric_type = models.ForeignKey(FabricType, on_delete=models.CASCADE)
    quantity_range = models.ForeignKey(QuantityRange, on_delete=models.CASCADE)
    size = models.CharField(max_length=100, choices=SIZE_CHOICES, null=False)


