import os
import json
import traceback
from django.conf import settings
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from api.views import (
    parse_resume_to_json as core_parse_resume_to_json,
    build_resume_standalone as core_build_resume_standalone,
    download_docx_api as core_download_docx_api,
    download_pdf_report_api as core_download_pdf_report_api,
    download_complete_report_api as core_download_complete_report_api,
    chatbot_questions as core_chatbot_questions,
    chatbot_generate_resume as core_chatbot_generate_resume
)


@api_view(['POST'])
@permission_classes([AllowAny])
def parse_resume_to_json(request):
    return core_parse_resume_to_json(request)


@api_view(['POST'])
@permission_classes([AllowAny])
def build_resume_standalone(request):
    return core_build_resume_standalone(request)


@api_view(['POST'])
@permission_classes([AllowAny])
def download_docx_api(request):
    return core_download_docx_api(request)


@api_view(['POST'])
@permission_classes([AllowAny])
def download_pdf_report_api(request):
    return core_download_pdf_report_api(request)


@api_view(['POST'])
@permission_classes([AllowAny])
def download_complete_report_api(request):
    return core_download_complete_report_api(request)


@api_view(['POST'])
@permission_classes([AllowAny])
def chatbot_questions(request):
    return core_chatbot_questions(request)


@api_view(['POST'])
@permission_classes([AllowAny])
def chatbot_generate_resume(request):
    return core_chatbot_generate_resume(request)
