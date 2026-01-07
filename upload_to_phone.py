from flask import Flask, request, send_from_directory
from flask_restful import Api, Resource
from flask_cors import CORS
from werkzeug.utils import secure_filename
from pathlib import Path

app = Flask(__name__)
api = Api(app)
CORS(app)

# Base directory
BASE_DIR = Path(__file__).resolve().parent

# Upload folder (inside project)
UPLOAD_FOLDER = BASE_DIR / "static" / "images"
UPLOAD_FOLDER.mkdir(parents=True, exist_ok=True)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


class UploadFile(Resource):
    def post(self):
        file = request.files.get("image")

        if not file:
            return {"error": "No file provided"}, 400

        filename = secure_filename(file.filename)
        file_path = app.config["UPLOAD_FOLDER"] / filename

        file.save(file_path)

        return {
            "message": "Image uploaded successfully",
            "filename": filename
        }, 201


class SendFile(Resource):
    def get(self):
        files = [
            f.name for f in app.config["UPLOAD_FOLDER"].iterdir()
            if f.is_file()
        ]
        return {"files": files}


class ServeFile(Resource):
    def get(self, filename):
        return send_from_directory(
            app.config["UPLOAD_FOLDER"],
            filename
        )


api.add_resource(UploadFile, "/upload")
api.add_resource(SendFile, "/files")
api.add_resource(ServeFile, "/files/<string:filename>")


if __name__ == "__main__":
    app.run(debug=True)
