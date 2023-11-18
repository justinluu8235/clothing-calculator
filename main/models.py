from django.db import models

from main.s3 import S3Client


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


def style_category_image_upload_to(instance, filename):
    return f"style_category_pics/{instance.pk}/{filename}"
class StyleCategory(models.Model):
    style_category_name = models.CharField(max_length=100, null=False, unique=True)
    image = models.FileField(blank=True, null=True, upload_to=style_category_image_upload_to)

    def __str__(self):
        return self.style_category_name

    def save(self, *args, **kwargs):
        pk = getattr(self, 'pk', None)
        if pk:
            client = S3Client()
            client.delete_objects(f"static/style_category_pics/{pk}")
        super().save(*args, **kwargs)


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


class Style(models.Model):
    name = models.CharField(max_length=250, null=True, blank=True)
    description = models.CharField(max_length=250, null=True, blank=True)
    notes = models.CharField(max_length=250, null=True, blank=True)
    washing_instructions = models.CharField(max_length=1000, null=True, blank=True)


def style_image_upload_to(instance, filename):
    return f"style_pics/style_{instance.style.pk}/{instance.pk}/{filename}"
class StyleImage(models.Model):
    style = models.ForeignKey(Style, on_delete=models.CASCADE, related_name="images")
    image = models.FileField(blank=True, null=True, upload_to=style_category_image_upload_to)

    def save(self, *args, **kwargs):
        pk = getattr(self, 'pk', None)
        if pk:
            client = S3Client()
            client.delete_objects(f"style_pics/style_{self.style.pk}/{self.pk}")
        super().save(*args, **kwargs)