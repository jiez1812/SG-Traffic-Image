from request_data import traffic_data_requests
import json
import requests
import shutil
import datetime

nowdt = datetime.datetime.now()
str_date_time = nowdt.strftime('%Y-%m-%dT%H:%M:%S')
traffics= traffic_data_requests(str_date_time)
traffic_json = traffics.request_json()
json_data = traffic_json.json()
cameras = json_data['items'][0]['cameras']
request_cameras = {'2702': 'Woodlands Custom',
                   '2701': 'First Link',
                   '4713': 'Tuas Custom',
                   '4703': 'Second Link',
                   '4712': 'Before Tuas Custom',
                   '2704': 'Before Woodlands Custom'}
traffic_folder_path = './traffic images/'

for camera in cameras:
    camera_id = camera['camera_id']
    if camera_id in request_cameras.keys():
        r = requests.get(camera['image'], stream=True)
        image_file_name = request_cameras[camera_id] + str_date_time.replace(':','') +'.jpg'
        image_path = traffic_folder_path + image_file_name
        with open(image_path, 'wb') as f:
            r.raw.decode_content = True
            shutil.copyfileobj(r.raw, f)