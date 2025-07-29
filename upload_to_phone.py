from flask import Flask,request,send_from_directory,jsonify
from flask_restful import Api,Resource
from flask_cors import CORS
import os

app = Flask(__name__)
api = Api(app)
CORS(app)

upload_folder = '/storage/emulated/0/upload_to_phone_images'
app.config['UPLOAD_FOLDER'] = upload_folder

if not os.path.exists(upload_folder):
 os.makedirs(upload_folder)

class UploadFile(Resource):
 def post(self):
  file = request.files.get('image')
  file_path = os.path.join(app.config['UPLOAD_FOLDER'],file.filename)
  file.save(file_path)
  return {'message':'image upload succefull'}

class SendFile(Resource):
 def get(self):
  files = os.listdir(app.config['UPLOAD_FOLDER'])
  return {'files':files}

class ServeFile(Resource):
 def get(self,filename):
  return send_from_directory(app.config['UPLOAD_FOLDER'],filename)

api.add_resource(UploadFile,'/upload')
api.add_resource(SendFile,'/files')
api.add_resource(ServeFile,'/files/<string:filename>')
