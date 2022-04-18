from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User

from base.products import products
from base.models import Product
from base.serializers import ProductSerializer, UserSerializer, UserSerializerWithToken

# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.conf import settings



@api_view(['GET'])
def verifyCode(request, code):
    if settings.ABOUTSHARE_SECURITY_CODE == code:
        return Response('https://docs.google.com/file/d/10SmBoZCnAUrqEd6fU9ycAzBOmxPgstih/preview?usp=drivesdk')

    return Response({'detail': 'Security code is not accepted'}, status=status.HTTP_400_BAD_REQUEST)

