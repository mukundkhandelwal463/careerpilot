"""
WSGI config for config project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/6.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# Run database migrations automatically on startup
try:
    import django
    django.setup()
    from django.core.management import call_command
    print("[WSGI] Running database migrations...")
    call_command('migrate', interactive=False)
    print("[WSGI] Migrations successfully applied.")
except Exception as e:
    print(f"[WSGI] Failed to run database migrations: {e}")

application = get_wsgi_application()
