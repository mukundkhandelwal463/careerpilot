import os
import json
import traceback
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from api.views import suggest_stream_keywords_api as core_suggest_stream_keywords_api


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def suggest_stream_keywords_api(request):
    return core_suggest_stream_keywords_api(request)
