from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route("/js/<path:path>")
def send_js(path):
    return send_from_directory("static/js", path)

@app.route("/css/<path:path>")
def send_css(path):
    return send_from_directory("static/css", path)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/offline")
def single_player():
    return render_template("offline.html")

@app.route("/multiplayer")
def multi_player():
    return render_template("multiplayer.html")

if __name__ == "__main__":
    app.run(port=8000, debug=True)
