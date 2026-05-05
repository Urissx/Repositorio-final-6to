from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def inicio(request):
    return HttpResponse("Bienvenido Usuario a StormGame")
def nosotros(request):
    return render (request, 'paginas/nosotros.html')
def torneos(request):
    return render (request, 'torneos/index.html')