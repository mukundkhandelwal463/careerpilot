import os
import re
from pathlib import Path
from dotenv import load_dotenv
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables
load_dotenv(BASE_DIR / ".env", override=True)

# Security and Key configuration
SECRET_KEY = os.environ.get("SECRET_KEY", "airesume-secret-key-2026")
DEBUG = os.environ.get("FLASK_ENV") != "production"
ALLOWED_HOSTS = ["*"]

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'api.apps.ApiConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # Needs to be before CommonMiddleware
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    # Disable CSRF check for API endpoints to match Flask's default API ease,
    # but in production, we can enforce CSRF or session credentials depending on configuration.
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'api.middleware.MetricsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR.parent / 'client' / 'dist'] if os.path.exists(BASE_DIR.parent / 'client' / 'dist') else [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database Setup
def _get_database_config():
    # dj_database_url prioritizes DATABASE_URL from env (perfect for PostgreSQL)
    # It will fallback to local sqlite if DATABASE_URL is not set
    db_config = dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'resume_screener.db'}",
        conn_max_age=600,
        conn_health_checks=True,
    )
    
    if 'sqlite' not in db_config['ENGINE']:
        print(f"[DB] Using remote database: {db_config['ENGINE']}")
    else:
        print("[DB] Falling back to local SQLite database.")
        
    return db_config

DATABASES = {
    'default': _get_database_config()
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Custom User Model
AUTH_USER_MODEL = 'api.User'

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Media files (User profile pictures, uploaded resumes)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

STATICFILES_DIRS = []
client_dist_static = BASE_DIR.parent / 'client' / 'dist'
if os.path.exists(client_dist_static):
    STATICFILES_DIRS.append(client_dist_static)

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Session Cookie and CORS configuration
is_local_dev = not DEBUG
secure_cookies = os.environ.get("SESSION_COOKIE_SECURE", "").lower() == "true" if os.environ.get("SESSION_COOKIE_SECURE") is not None else is_local_dev

SESSION_COOKIE_SECURE = secure_cookies
SESSION_COOKIE_SAMESITE = 'Lax' if not secure_cookies else 'None'
SESSION_COOKIE_HTTPONLY = True

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CSRF_TRUSTED_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173']

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'api.authentication.CsrfExemptSessionAuthentication',
    ),
}
