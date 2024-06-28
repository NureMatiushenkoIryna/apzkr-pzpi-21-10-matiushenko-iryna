from api_service import ApiService

class LoginService:
    def __init__(self):
        self.api_service = ApiService()


    def sign_in(self):
        email = input("Email: ")
        password = input("Password: ")
        
        if email and password and self.api_service.sign_in(email, password):
            return
        print("Either login or password is incorrect!")
        self.sign_in()
