import requests, json, shutil, datetime

class traffic_data_requests():
    def __init__(self):
        self.base_url = r'https://api.data.gov.sg/v1/transport/traffic-images?date_time='
        self.image_folder_path = './traffic images/'
        self.request_cameras = {
            '2702': 'Woodlands Custom',
            '2701': 'First Link',
            '4713': 'Tuas Custom',
            '4703': 'Second Link',
            '4712': 'Before Tuas Custom',
            '2704': 'Before Woodlands Custom'
        }

    def generate_datetime_now(self):
        nowdt = datetime.datetime.now()
        strdt = nowdt.strftime('%Y-%m-%dT%H:%M:%S')
        return strdt.replace(':','%3A')

    def generate_request_url(self, strdt):
        return self.base_url + strdt

    def request_json(self):
        self.strdt = self.generate_datetime_now()
        request_url = self.generate_request_url(self.strdt)
        return requests.get(request_url)

    def get_data(self):
        json_file = self.request_json()
        return json_file.json()
    
    def get_cameras(self):
        camera_data = self.get_data()
        return camera_data['items'][0]['cameras']

    def get_images(self):
        cameras = self.get_cameras()
        for camera in cameras:
            cam_id = camera['camera_id']
            if cam_id in self.request_cameras.keys():
                stream_image = requests.get(camera['image'], stream=True)
                image_file_name = cam_id + self.strdt.replace('%3A','') + '.jpg'
                image_path = self.image_folder_path + image_file_name
                with open(image_path, 'wb') as f:
                    stream_image.raw.decode_content = True
                    shutil.copyfileobj(stream_image.raw, f)

    def run(self):
        self.get_images()

if __name__ == '__main__':
    app = traffic_data_requests()
    app.run()