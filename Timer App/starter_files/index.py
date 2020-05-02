from flask import Flask, render_template, send_from_directory, request

app = Flask(__name__)

timers = {}


@app.route("/", methods=['GET'])
def index():
    if(request.method == "GET"):
        return render_template("index.html")


@app.route("/get_timer", methods=['GET'])
def getTimer():
    if(request.method == "GET"):


@app.route("/create_timer", methods=['POST'])
def createTimer():
    if(request.method == "POST"):
        result = request.json


@app.route("/edit_timer", methods=["POST"])
def editTimer():
    if(request.method == "POST"):
        result = request.json


@app.route("/delete_timer", methods=["POST"])
def deleteTimer():
    if(request.method == "POST"):
        result = request.json


if __name__ == "__main__":
    app.run(port=5000, host="0.0.0.0", debug=False)
