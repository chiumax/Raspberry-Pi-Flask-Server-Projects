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
        print("Timer GET req")
        return timers


@app.route("/create_timer", methods=['POST'])
def createTimer():
    print(request)
    if(request.method == "POST"):
        result = request.json
        timers[str(result['id'])] = {
            "name": result['name'],
            "end": result['end'],
            "start": result['id'],
            "disabled": result['disabled']
        }
        print("Timer Created!")

        return timers


@app.route("/edit_timer", methods=["POST"])
def editTimer():
    if(request.method == "POST"):
        result = request.json
        timers[str(result['id'])] = {
            "name": result['name'],
            "end": result['end'],
            "start": result['id'],
            "disabled": result['disabled']
        }
        print("Timer Edited!")
        return {"response": "OK"}


@app.route("/delete_timer", methods=["POST"])
def deleteTimer():
    if(request.method == "POST"):
        result = request.json
        timers[str(result['id'])] = {

            "disabled": result['disabled']
        }
        print("Timer Deleted!")
        return {"response": "OK"}


if __name__ == "__main__":
    app.run(port=5000, host="0.0.0.0", debug=False)
