from django.urls import URLPattern, path
from base.views import aboutshare_views as views

urlpatterns = [    
    path('verifycode/<str:code>/', views.verifyCode, name='verifyCode'),
]