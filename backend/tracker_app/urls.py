from django.urls import path
from tracker_app import views

urlpatterns = [
    path('dashboard', views.get_dashboard, name='tracker_dashboard'),
    path('resumes', views.list_or_create_resumes, name='tracker_resumes'),
    path('resumes/<int:resume_id>', views.get_or_delete_resume, name='tracker_resume_detail'),
    path('interview/roadmap', views.generate_roadmap, name='tracker_generate_roadmap'),
    path('interview/notify-overdue', views.notify_overdue_tasks, name='tracker_notify_overdue_tasks'),
]
