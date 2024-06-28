import network
import time

class NetworkService:
    wlan = network.WLAN(network.STA_IF)

    def connect_to_wifi(self):
        ssid = 'Wokwi-GUEST'
        password = ''
        print("Connecting to WiFi", end="")
        self.wlan.active(True)
        self.wlan.connect(ssid, password)
        while not self.wlan.isconnected():
            print(".", end="")
            time.sleep(0.1)
        print("Connected!")
