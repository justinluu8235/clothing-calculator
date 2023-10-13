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


SIZE_SET_CHOICES = [('3 sizes (S, M, L)', '3 sizes (S, M, L)'), ('5 sizes (XS, S, M, L, XL)', '5 sizes (XS, S, M, L, XL)')]
class StylePricePoint(models.Model):
    style_category = models.ForeignKey(StyleCategory, on_delete=models.CASCADE)
    fabric_type = models.ForeignKey(FabricType, on_delete=models.CASCADE)
    quantity_range = models.ForeignKey(QuantityRange, on_delete=models.CASCADE)
    size = models.CharField(max_length=100, choices=SIZE_SET_CHOICES, null=False)
    estimated_cost = models.IntegerField(null=False)

    def __str__(self):
        return (f"(category: {self.style_category}, fabric: {self.fabric_type}, "
                f"quantity: {self.quantity_range}, size: {self.size}, est_cost: {self.estimated_cost})")


