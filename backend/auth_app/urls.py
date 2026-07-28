from django.urls import path
from auth_app import views

urlpatterns = [
    path('register', views.register, name='auth_register'),
    path('verify-otp', views.verify_otp, name='auth_verify_otp'),
    path('resend-otp', views.resend_otp, name='auth_resend_otp'),
    path('login', views.login, name='auth_login'),
    path('logout', views.logout, name='auth_logout'),
    path('google', views.google_auth, name='auth_google'),
    path('google-client-id', views.get_google_client_id, name='auth_google_client_id'),
    path('me', views.get_current_user, name='auth_me'),
    path('update', views.update_profile, name='auth_update_profile'),
]
