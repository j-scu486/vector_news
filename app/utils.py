from flask import current_app
from werkzeug.utils import secure_filename
import os

def check_image(file):
    image_file = secure_filename(file)

    if image_file != '':
        file_ext = os.path.splitext(image_file)[1]
        if file_ext not in current_app.config['UPLOAD_EXTENSIONS']:
            return {"message": "error"}, 400

    return image_file