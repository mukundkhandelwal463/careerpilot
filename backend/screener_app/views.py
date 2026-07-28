import os
import json
import traceback
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from api.models import Resume, ResumeScanResult
from api.views import (
    generate_summary as core_generate_summary,
    enhance_text as core_enhance_text,
    rank_candidates as core_rank_candidates,
    recommend_jobs as core_recommend_jobs,
    search_jobs_jsearch as core_search_jobs_jsearch,
    session_analysis as core_session_analysis,
    analyze_resume as core_analyze_resume
)


@api_view(['POST'])
@permission_classes([AllowAny])
def generate_summary(request):
    return core_generate_summary(request)


@api_view(['POST'])
@permission_classes([AllowAny])
def enhance_text(request):
    return core_enhance_text(request)


@api_view(['POST'])
@permission_classes([AllowAny])
def rank_candidates(request):
    return core_rank_candidates(request)


@api_view(['POST'])
@permission_classes([AllowAny])
def recommend_jobs(request):
    return core_recommend_jobs(request)


@api_view(['POST'])
@permission_classes([AllowAny])
def search_jobs_jsearch(request):
    return core_search_jobs_jsearch(request)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def session_analysis(request):
    return core_session_analysis(request)


@api_view(['POST'])
@permission_classes([AllowAny])
def analyze_resume(request):
    return core_analyze_resume(request)
