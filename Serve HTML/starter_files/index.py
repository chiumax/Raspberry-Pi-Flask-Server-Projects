from flask import Flask, render_template, send_from_directory, request

app = Flask(__name__)

# Try finding the ip address of the Raspberry PI to demo on other computers


@app.route("/", methods=['GET'])
def index():
    if(request.method == "GET"):


if __name__ == "__main__":
    app.run(port=5000, host="0.0.0.0", debug=False)
