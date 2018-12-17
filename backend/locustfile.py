from locust import HttpLocust, TaskSet, task
import json

class UserBehavior(TaskSet):
    def on_start(self):
        """ on_start is called when a Locust start before any task is scheduled """
        self.signin()

    def on_stop(self):
        """ on_stop is called when the TaskSet is stopping """
        self.signout()

    #def login(self):
    #    self.client.post("api/sign_in", {"email":"kimwj94@snu.ac.kr", "password":"123456"})

    def signin(self):
        response = self.client.get("api/token")
        csrftoken = response.cookies['csrftoken']

        self.client.post("api/sign_in", json.dumps({'email': '1@snu.ac.kr', 'password': '1'}),
        headers={"X-CSRFToken": csrftoken}, cookies={"csrftoken": csrftoken})

    def signout(self):
        self.client.get("api/sign_out")
    

    @task(2)
    def room(self):
        self.client.get("api/room")

    @task(1)
    def tournament(self):
        self.client.get("api/tournament")
    
    def 

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 5000
    max_wait = 9000