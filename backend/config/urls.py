import os
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.http import HttpResponse
from api.views import prometheus_metrics

def serve_spa(request, path=''):
    """Serve the React single page app. Serves assets directly and maps paths to index.html."""
    dist_dir = settings.BASE_DIR.parent / 'client' / 'dist'
    
    # If the path points to an actual file in the build directory, serve it
    file_path = dist_dir / path
    if path and os.path.isfile(file_path):
        import mimetypes
        content_type, _ = mimetypes.guess_type(str(file_path))
        with open(file_path, 'rb') as f:
            return HttpResponse(f.read(), content_type=content_type or 'application/octet-stream')
            
    # Otherwise, fall back to serving index.html for React Router
    index_path = dist_dir / 'index.html'
    if os.path.exists(index_path):
        with open(index_path, 'r', encoding='utf-8') as f:
            return HttpResponse(f.read())
    else:
        return HttpResponse(
            "<h3>React build index.html not found.</h3>"
            "<p>Please build the React application by running `npm run build` inside the `client` directory.</p>",
            status=404
        )

urlpatterns = [
    path('admin/', admin.site.urls),
    path('metrics', prometheus_metrics, name='metrics'),
    path('api/', include('api.urls')),
    
    # Catch-all route to serve the React SPA
    re_path(r'^(?P<path>.*)$', serve_spa, name='serve_spa'),
]
