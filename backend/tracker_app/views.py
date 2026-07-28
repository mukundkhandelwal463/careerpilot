import os
import json
import traceback
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from api.views import (
    get_dashboard as core_get_dashboard,
    list_or_create_resumes as core_list_or_create_resumes,
    get_or_delete_resume as core_get_or_delete_resume,
    generate_roadmap as core_generate_roadmap,
    notify_overdue_tasks as core_notify_overdue_tasks
)


@api_view(['GET'])
def get_dashboard(request):
    return core_get_dashboard(request)


@api_view(['GET', 'POST'])
def list_or_create_resumes(request):
    return core_list_or_create_resumes(request)


@api_view(['GET', 'DELETE'])
def get_or_delete_resume(request, resume_id):
    return core_get_or_delete_resume(request, resume_id)


@api_view(['POST'])
@permission_classes([AllowAny])
def generate_roadmap(request):
    return core_generate_roadmap(request)


@api_view(['POST'])
def notify_overdue_tasks(request):
    return core_notify_overdue_tasks(request)
