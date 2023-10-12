from django.shortcuts import render
from django.views.generic import TemplateView

def index(request):
    return render(request, 'index.html')

class StyleCalculatorView(TemplateView):
    def get(self, request, *args, **kwargs):
        print('hello')
