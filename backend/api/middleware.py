from api.views import _increment

class MetricsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        _increment("http_requests_total")
        response = self.get_response(request)
        return response
