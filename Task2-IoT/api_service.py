import constants
import urequests
from utils import get_iso_date

class ApiService:
    def sign_in(self, email, password):
        url = f"{constants.API_URL}/auth/sign-in"
        payload = {
            "email": email,
            "password": password,
        }
        headers = {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true"
        }

        response = urequests.post(url, json=payload, headers=headers)

        if response.status_code == 201:
            constants.ACCESS_TOKEN = response.json()['accessToken']
            return True
        else:
            return False

    
    def send_incident(self, abnormalValue, incidentType, description):
        url = f"{constants.API_URL}/incidents"
        payload = {
            "abnormalValue": abnormalValue,
            "type": incidentType,
            "description": description,
            "chargingId": constants.CURRENT_CHARGING_ID
        }
        headers = {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "Authorization": f"Bearer {constants.ACCESS_TOKEN}",
        }
        
        response = urequests.post(url, json=payload, headers=headers)
        return response.status_code == 201


    def get_active_car(self):
        url = f"{constants.API_URL}/cars/active"
        headers = {
            "ngrok-skip-browser-warning": "true",
            "Authorization": f"Bearer {constants.ACCESS_TOKEN}",
        }

        response = urequests.get(url, headers=headers)
        responseJson = response.json()
        if response.status_code == 200 and responseJson:
            constants.ACTIVE_CAR_MODEL = responseJson['model']
            return True
        else:
            return False

    
    def start_charging(self, startPercent):
        url = f"{constants.API_URL}/chargings"
        payload = {
            "stationId": constants.STATION_ID,
            "startPercent": startPercent
        }
        headers = {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "Authorization": f"Bearer {constants.ACCESS_TOKEN}",
        }
        response = urequests.post(url, json=payload, headers=headers)
        responseJson = response.json()
        if response.status_code == 201:
            constants.CURRENT_CHARGING_ID = responseJson['id']
            return True
        else:
            return False


    def finish_charging(self, endPercent):
        url = f"{constants.API_URL}/chargings/{constants.CURRENT_CHARGING_ID}"
        payload = {
            "status": "finished",
            "endPercent": endPercent
        }
        headers = {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            "Authorization": f"Bearer {constants.ACCESS_TOKEN}",
        }
        response = urequests.patch(url, json=payload, headers=headers)
        if response.status_code == 201:
            constants.CURRENT_CHARGING_ID = ""
            return True
        else:
            return False