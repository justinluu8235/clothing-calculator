from django.contrib.auth.models import User
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

    def delete(self, *args, **kwargs):
        client = S3Client()
        client.delete_objects(f"static/style_category_pics/{self.pk}")
        super().delete(*args, **kwargs)


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


class StyleSource(models.Model):
    source_name = models.CharField(max_length=250, blank=True)

    def __str__(self):
        return self.source_name

class FabricSource(models.Model):
    source_name = models.CharField(max_length=250, blank=True)

    def __str__(self):
        return self.source_name


class Style(models.Model):
    name = models.CharField(max_length=250, null=True, blank=True)
    description = models.CharField(max_length=250, null=True, blank=True)
    internal_notes = models.CharField(max_length=250, null=True, blank=True)
    washing_instructions = models.CharField(max_length=1000, null=True, blank=True)
    model_number = models.CharField(max_length=150, null=False)
    fabric_model_number = models.CharField(max_length=150, null=True, blank=True)
    source = models.ForeignKey(StyleSource, on_delete=models.DO_NOTHING, null=True, blank=True,related_name="source")
    fabric_composition = models.CharField(max_length=250, blank=True)
    fabric_source = models.ForeignKey(FabricSource, on_delete=models.DO_NOTHING, null=True, blank=True, related_name="fabric_source")
    available_colors = models.CharField(max_length=250, blank=True)
    minimum_order_quantity = models.IntegerField(null=True, blank=True)
    is_showroom = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.model_number} - {self.name}"


def style_image_upload_to(instance, filename):
    return f"style_pics/style_{instance.style.pk}/{instance.pk}/{filename}"
class StyleImage(models.Model):
    style = models.ForeignKey(Style, on_delete=models.CASCADE, related_name="images")
    image = models.FileField(blank=True, null=True, upload_to=style_image_upload_to)

    def save(self, *args, **kwargs):
        pk = getattr(self, 'pk', None)
        if pk:
            client = S3Client()
            client.delete_objects(f"static/style_pics/style_{self.style.pk}/{self.pk}")
        else:
            next_pk = StyleImage.objects.order_by('-pk').first().pk + 1 if StyleImage.objects.exists() else 1
            self.pk = next_pk
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        client = S3Client()
        client.delete_objects(f"static/style_pics/style_{self.style.pk}/{self.pk}")
        super().delete(*args, **kwargs)

class UserStyle(models.Model):
    style = models.ForeignKey(Style, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="styles")


class ClientCompany(models.Model):
    company_name = models.CharField(max_length=200, blank=False)
    address = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=200, blank=True)
    state = models.CharField(max_length=200, blank=True)
    zip_code = models.CharField(max_length=200, blank=True)
    main_contact_name = models.CharField(max_length=150, blank=False)
    email = models.CharField(max_length=150, blank=False)
    phone_number = models.CharField(max_length=50, blank=True)
    website = models.CharField(max_length=150, blank=True)
    additional_information = models.CharField(max_length=500, blank=True)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name="company", null=True, blank=True)


class QuotationRequest(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name="quotation_requests")
    company = models.ForeignKey(ClientCompany, on_delete=models.DO_NOTHING)
    styles = models.ManyToManyField(Style)
    request_notes = models.CharField(max_length=500, blank=True)
