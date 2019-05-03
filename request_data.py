import requests, json, shutil, datetime

class traffic_data_requests():
    def __init__(self):
        self.base_url = r'https://api.data.gov.sg/v1/transport/traffic-images?date_time='

    def generate_datetime_now(self):
        nowdt = datetime.datetime.now()
        return nowdt.strftime('%Y-%m-%dT%H%3A%M%3A%S')

    def generate_request_url(self, strdt):
        return self.base_url + strdt

    def request_json(self):
        strdt = self.generate_datetime_now()
        request_url = self.generate_request_url(strdt)
        return requests.get(request_url)