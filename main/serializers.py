from rest_framework import serializers
from .models import StylePricePoint, QuantityRange, FabricType, StyleCategory

class StylePricePointSerializer (serializers.ModelSerializer):
    class Meta:
        model = StylePricePoint
        fields = '__all__'

class QuantityRangeSerializer (serializers.ModelSerializer):
    class Meta:
        model = QuantityRange
        fields = '__all__'

class FabricTypeSerializer (serializers.ModelSerializer):
    class Meta:
        model = FabricType
        fields = '__all__'

class StyleCategorySerializer (serializers.ModelSerializer):
    class Meta:
        model = StyleCategory
        fields = '__all__'