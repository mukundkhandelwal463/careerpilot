import os
import json
import traceback
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from api.views import (
    start_interview as core_start_interview,
    grade_response as core_grade_response,
    save_interview_score as core_save_interview_score,
    generate_mock_test_api as core_generate_mock_test_api,
    run_code_api as core_run_code_api,
    submit_mock_test_api as core_submit_mock_test_api,
    get_results_api as core_get_results_api
)


@api_view(['POST'])
@permission_classes([AllowAny])
def start_interview(request):
    return core_start_interview(request)


@api_view(['POST'])
@permission_classes([AllowAny])
def grade_response(request):
    return core_grade_response(request)


@api_view(['POST'])
def save_interview_score(request):
    return core_save_interview_score(request)


@api_view(['POST'])
@permission_classes([AllowAny])
def generate_mock_test_api(request):
    return core_generate_mock_test_api(request)


@api_view(['POST'])
@permission_classes([AllowAny])
def run_code_api(request):
    return core_run_code_api(request)


@api_view(['POST'])
@permission_classes([AllowAny])
def submit_mock_test_api(request):
    return core_submit_mock_test_api(request)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_results_api(request):
    return core_get_results_api(request)
