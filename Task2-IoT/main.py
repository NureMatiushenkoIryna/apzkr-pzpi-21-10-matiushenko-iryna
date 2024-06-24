from machine import Pin, I2C, ADC
import time
import network
import urequests
import random
from api_service import ApiService
from network_service import NetworkService
from login_service import LoginService
import constants


potentiometer = ADC(Pin(34))

slide_switch = Pin(19, Pin.IN)
button = Pin(2, Pin.OUT)
led = Pin(4, Pin.OUT)

charging = False
voltage = 230.0
state_of_charge = 0

temperature = 25.0

class AppService:
    def __init__(self):
        self.api_service = ApiService()
        self.netword_service = NetworkService()
        self.login_service = LoginService()

    def read_current(self):
        sensor_value = potentiometer.read()
        current = (sensor_value / 4095.0) * 20
        return current

    def read_temperature(self):
        sensor_value = potentiometer.read()
        print(sensor_value / 4095.0 * 30)
        return random.uniform(20.0, 20 + (sensor_value / 4095.0 * 30))


    def charge(self):
        global charging, state_of_charge, temperature

        startPercent = random.randint(0, 20)
        state_of_charge = startPercent
        self.api_service.start_charging(startPercent)

        while True:
            turnedOff = False
            if button.value() == 1:
                turnedOff = True
                charging = not charging
                time.sleep(0.5)

            if charging:
                if state_of_charge == 0:
                    state_of_charge = random.randint(0, 20)
                current = self.read_current()
                state_of_charge += current * 0.1
                state_of_charge = min(state_of_charge, 100)

                temperature = self.read_temperature() 
                
                power = current * voltage

                if temperature > constants.OVERHEAT_THRESHOLD:
                    self.api_service.send_incident(temperature, "overheat", "The car was overheated")
            
                print('EV Charging Monitor', 0, 0)
                print(f'Voltage: {voltage:.2f}V', 0, 10)
                print(f'Current: {current:.2f}A', 0, 20)
                print(f'Power: {power:.2f}W', 0, 30)
                print(f'State of Charge: {state_of_charge:.2f}%', 0, 40)
                print('Status: Charging' if charging else 'Status: Not Charging', 0, 50)
                print(f'Temperature: {temperature:.2f}C', 0, 50)

                if state_of_charge == 100:
                    charging = False
                    self.api_service.finish_charging(state_of_charge)
                    print("Thank you for using our charging service!")
                    state_of_charge = 0
                    break
            elif turnedOff:
                self.api_service.finish_charging(state_of_charge)
                print("Thank you for using our charging service!")
                state_of_charge = 0
                break

            led.value(charging)
            time.sleep(1)


    def prepare_charge(self):
        self.verify_active_car()
        self.charge()


    def configure(self):
        url = input("Enter the URL to change to: ")
        constants.API_URL = url
        print("Changed!")

    
    def verify_active_car(self):
        print("Waiting for the car to be plugged in. Please confirm when it's ready.")
        input()
        hasActiveCar = self.api_service.get_active_car()
        if not hasActiveCar:
            print("No active car selected. Please choose it in the app and confirm again.")
            return self.verify_active_car()
        print("Got active car")


    def main(self):
        global charging, state_of_charge
        self.netword_service.connect_to_wifi()
        print("Welcome to our station! Please sign in.")
        self.login_service.sign_in()
        while True:
            print("What would you like to do?")
            print("1 - Charge my active car")
            print("2 - Change server URL")
            action = int(input())
            if action == 1:
                self.prepare_charge()
            elif action == 2:
                self.configure()
            else:
                break


app_service = AppService()

app_service.main()
