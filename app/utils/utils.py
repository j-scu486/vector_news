from flask import current_app, abort
from werkzeug.utils import secure_filename
import re, os

# Regex for EMAIL and WEBSITE
EMAIL_REGEX = re.compile(r'[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$')

regex = re.compile(
        r'^(?:http|ftp)s?://' # http:// or https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)|' #domain...
        r'localhost|' #localhost...
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})' # ...or ip
        r'(?::\d+)?' # optional port
        r'(?:/?|[/?]\S+)$', re.IGNORECASE)

# Check that filename image is safe
def check_image(file):
    image_file = secure_filename(file)

    if image_file != '':
        file_ext = os.path.splitext(image_file)[1]
        if file_ext not in current_app.config['UPLOAD_EXTENSIONS']:
            return {"error": "Image is invalid"}

    return image_file