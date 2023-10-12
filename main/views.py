from django.shortcuts import render
from django.views import View
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from .models import StylePricePoint, QuantityRange, FabricType, StyleCategory
from .serializers import StyleCategorySerializer, QuantityRangeSerializer, FabricTypeSerializer, StylePricePointSerializer
import json
def index(request):
    return render(request, 'index.html')

class StyleCalculatorView(View):
    def get(self, request, *args, **kwargs):
        quantity_ranges = QuantityRange.objects.all()
        fabric_types = FabricType.objects.all()
        style_categories = StyleCategory.objects.all()
        fabrics = []
        quantitys = []
        categories = []
        for fabric_type in fabric_types:
            fabrics.append({'id': fabric_type.id, 'label': fabric_type.fabric_name})
        for quantity_range in quantity_ranges:
            quantitys.append({'id': quantity_range.id, 'label': quantity_range.__str__()})
        for style_category in style_categories:
            categories.append({'id': style_category.id, 'label': style_category.style_category_name})
        response = {
            'quantity_ranges': quantitys,
            'fabric_types': fabrics,
            'style_categories': categories,
        }
        return JsonResponse(response)

    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)
        price_point = StylePricePoint.objects.filter(style_category_id=data['style_category'], fabric_type_id=data['fabric_type'],
                                       quantity_rage_id=data['quantity_range'])
        return JsonResponse({'estimated_cost': price_point.first().estimated_cost})
