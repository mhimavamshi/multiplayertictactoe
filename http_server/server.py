from flask import Flask, render_template, send_from_directory, redirect, request, make_response
from src.id_gen import clientID_gen, gameID_gen

app = Flask(__name__)

@app.route("/js/<path:path>", methods=["GET"])
def send_js(path):
    return send_from_directory("static/js", path)

@app.route("/css/<path:path>", methods=["GET"])
def send_css(path):
    return send_from_directory("static/css", path)

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/offline", methods=["GET"])
def single_player():
    return render_template("offline.html")

@app.route("/multiplayer", methods=["GET"])
def multi_player():
    return render_template("multiplayer.html")

games = {}

@app.route("/create", methods=["POST"])
def create_game():

    gameID = gameID_gen()
    while gameID in games:
        gameID = gameID_gen()
    games[gameID] = set()
    return gameID

@app.route("/join", methods=["GET"])
def join_game():

    print(games)

    gameID = request.args.get("gameID")
    if gameID not in games:
        return redirect("/multiplayer")

    clientID = request.cookies.get("clientID")
    if clientID in games[gameID]:
        return render_template("multiplayergame.html", clientID=clientID, gameID=gameID)

    if len(games[gameID]) < 2:
        clientID = clientID_gen()
        while clientID in games[gameID]: clientID = clientID_gen()
        games[gameID].add(clientID)
        resp = make_response(render_template("multiplayergame.html", clientID=clientID, gameID=gameID))
        resp.set_cookie("clientID", clientID)
        return resp
    
    return redirect("/multiplayer")


if __name__ == "__main__":
    app.run(port=8000, debug=True)
