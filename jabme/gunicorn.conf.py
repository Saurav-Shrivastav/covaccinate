# Access log - records incoming HTTP requests
accesslog = "/home/app/web/logs/gunicorn/access.log"

# Error log - records Gunicorn server goings-on
errorlog = "/home/app/web/logs/gunicorn/error.log"

# Whether to send Django output to the error log
capture_output = True

# How verbose the Gunicorn error logs should be
loglevel = "info"
