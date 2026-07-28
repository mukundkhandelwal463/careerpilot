from django.urls import path
from interview_app import views

urlpatterns = [
    path('interview/start', views.start_interview, name='interview_start_interview'),
    path('interview/grade', views.grade_response, name='interview_grade_response'),
    path('interview/save-score', views.save_interview_score, name='interview_save_interview_score'),
    path('mock-test/generate', views.generate_mock_test_api, name='interview_generate_mock_test_api'),
    path('mock-test/run-code', views.run_code_api, name='interview_run_code_api'),
    path('mock-test/submit', views.submit_mock_test_api, name='interview_submit_mock_test_api'),
    path('results/list', views.get_results_api, name='interview_get_results_api'),
]
