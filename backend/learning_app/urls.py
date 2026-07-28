from django.urls import path
from learning_app import views

urlpatterns = [
    path('suggest-stream-keywords', views.suggest_stream_keywords_api, name='learning_suggest_stream_keywords_api'),
    path('suggest-stream-keywords/', views.suggest_stream_keywords_api, name='learning_suggest_stream_keywords_api_slash'),
]
