import os

from django.http import HttpResponse

allowed_ips = os.environ.get("ALLOWED_IPS", "localhost 127.0.0.1").split()


def login_by_ip(view_func):
    def authorize(request, *args, **kwargs):
        user_ip = request.META["REMOTE_ADDR"]
        for ip in allowed_ips:
            if ip == user_ip:
                return view_func(request, *args, **kwargs)
        return HttpResponse("Forbidden. F Off.")

    return authorize
