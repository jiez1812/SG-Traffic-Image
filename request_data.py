import requests
import json

class traffic_data_requests():
    def __init__(self, date_time):
        self.base_url = r'https://api.data.gov.sg/v1/transport/traffic-images?date_time='
        self.date_time = date_time.replace(':', '%3A')
        self.concate_url = self.base_url + self.date_time

    def request_json(self):
        return requests.get(self.concate_url)

    def select_camera(self, traffic_json):
        pass