from rest_framework import serializers
from .models import StylePricePoint, QuantityRange, FabricType, StyleCategory, UserStyle, StyleImage, Style, ClientCompany



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


class StyleImageSerializer (serializers.ModelSerializer):
    class Meta:
        model = StyleImage
        fields = '__all__'

class StyleSerializer (serializers.ModelSerializer):
    images = StyleImageSerializer(many=True)
    class Meta:
        model = Style
        fields = '__all__'

class UserStyleSerializer (serializers.ModelSerializer):
    style = StyleSerializer(many=False)

    class Meta:
        model = UserStyle
        fields = '__all__'

class ClientCompanySerializer (serializers.ModelSerializer):
    class Meta:
        model = ClientCompany
        fields = '__all__'


