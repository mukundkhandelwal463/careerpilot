from django.urls import path
from screener_app import views

urlpatterns = [
    path('analyze-resume', views.analyze_resume, name='screener_analyze_resume'),
    path('generate-summary', views.generate_summary, name='screener_generate_summary'),
    path('enhance-text', views.enhance_text, name='screener_enhance_text'),
    path('rank-candidates', views.rank_candidates, name='screener_rank_candidates'),
    path('recommend-jobs', views.recommend_jobs, name='screener_recommend_jobs'),
    path('search-jobs', views.search_jobs_jsearch, name='screener_search_jobs_jsearch'),
    path('session/analysis', views.session_analysis, name='screener_session_analysis'),
]
