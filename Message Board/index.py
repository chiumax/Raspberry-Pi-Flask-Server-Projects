from flask import Flask, render_template, send_from_directory, request, jsonify

import random
def r(): return random.randint(0, 255)
# ip route
# https://stackoverflow.com/questions/13998901/generating-a-random-hex-color-in-python
# https://stackoverflow.com/questions/22567306/python-requests-file-upload
# https://stackoverflow.com/questions/28027472/flask-get-image-via-post

# Hosting a potential server
# https://www.reddit.com/r/flask/comments/2321oc/easiest_and_fastest_way_to_host_flask_python/


app = Flask(__name__)

messages = [{
    "user": "admin",
    "msg": "Welcome to my app!",
    "timestamp": 0
}]
# users[user].color
users = {
    "admin": {
        "username": "admin",
        "password": "root",
        "timestamp": 0,
        "color": "#f50f0f",
        "sessionId": 0
    }
}


@app.route("/", methods=['GET'])
def index():
    if(request.method == "GET"):
        return render_template("index.html")


@app.route("/login", methods=['POST'])
def login():
    if(request.method == "POST"):
        result = request.json

        logType = result['type']
        username = result['user']
        password = result['pass']
        # Timestamp??
        timestamp = result['time']

        # Check if login type is "Create account" or "Log in"
        if(logType == "create"):
            # Check if user already exists
            if(users.get(username) == None):

                users[username] = {
                    "username": username,
                    "password": password,
                    "timestamp": timestamp,
                    "sessionId": result["sessionId"],
                    "color": ('#%02X%02X%02X' % (r(), r(), r()))

                }
                # modal or notif account created!!
                return "create"
            else:
                # modal or notif account already exists! shake button/form
                return "exists"

        elif(logType == "login"):
            # incorrect username or password
            if(users.get(username) != None and users[username]["password"] == password):
                # if username exists and password of user equals submitted password
                # modal notif login success
                # should return timestamp as a key or a newtimestamp as a key

                # refresh sessionId
                users[username]["sessionId"] = result["sessionId"]
                return "log"
            else:
                # incorrect username or pasword
                return "incorrect"


@app.route("/send_message", methods=['POST'])
def send_message():
    if(request.method == "POST"):
        result = request.json
        user = result["user"]
        if(result["sessionId"] == users[user]["sessionId"]):
            messages.append({
                "user": result["user"],
                "msg": result["msg"],
                "timestamp": result["time"]
            })
            return "message sent"

        return "FAIL"


@app.route("/get_messages", methods=['GET'])
def get_message():
    if(request.method == "GET"):
        return {
            "messages": messages,
            "users": users
        }


if __name__ == "__main__":
    app.run(port=5000, host="0.0.0.0", debug=False)
