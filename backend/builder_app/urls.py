from django.urls import path
from builder_app import views

urlpatterns = [
    path('parse-resume-to-json', views.parse_resume_to_json, name='builder_parse_resume_to_json'),
    path('build-resume', views.build_resume_standalone, name='builder_build_resume_standalone'),
    path('download-docx', views.download_docx_api, name='builder_download_docx_api'),
    path('results/download-pdf', views.download_pdf_report_api, name='builder_download_pdf_report_api'),
    path('results/download-complete-report', views.download_complete_report_api, name='builder_download_complete_report_api'),
    path('chatbot/questions', views.chatbot_questions, name='builder_chatbot_questions'),
    path('chatbot/generate-resume', views.chatbot_generate_resume, name='builder_chatbot_generate_resume'),
]
