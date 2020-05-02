from flask import Flask, render_template, send_from_directory, request, jsonify

import random


def r(): return random.randint(0, 255)


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


@app.route("/send_message", methods=['POST'])
def send_message():
    if(request.method == "POST"):
        result = request.json


@app.route("/get_messages", methods=['GET'])
def get_message():
    if(request.method == "GET"):


if __name__ == "__main__":
    app.run(port=5000, host="0.0.0.0", debug=False)
