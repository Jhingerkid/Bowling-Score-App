from os import stat
from flask import Flask, request
import pymysql
import json

statistics = []

app = Flask(__name__)


def dbGather(query):
    connect = pymysql.connect(
        host='freetrainer.cryiqqx3x1ub.us-west-2.rds.amazonaws.com',
        user='tom',
        password='changeme',
        db='bowling_score',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )
    cursor = connect.cursor()
    cursor.execute(query)
    output = cursor.fetchall()
    connect.close()
    return output


def dbInsert(query):
    connect = pymysql.connect(
        host='freetrainer.cryiqqx3x1ub.us-west-2.rds.amazonaws.com',
        user='tom',
        password='changeme',
        db='bowling_score',
    )
    cursor = connect.cursor()
    cursor.execute(query)
    connect.commit()
    connect.close()


@app.route('/players')
def get_current_players():
    query = "SELECT * FROM bowling_score.players"
    response = dbGather(query)
    return json.dumps(response)

@app.route('/playerStats', methods=['POST', 'GET'])
def get_player_stats():
    if request.method == "POST":
        statistics.clear()
        for player in request.json:
            playerId = str(player['playerId'])
            query = 'SELECT * FROM bowling_score.players WHERE playerId = ' + playerId + ''
            statistics.append(dbGather(query))
        return ('', 204)
    elif request.method == "GET":
        return json.dumps(statistics)


@app.route('/newPlayer', methods=['POST'])
def submit_new_player():
    playerName = request.json['playerName']
    query = 'INSERT INTO bowling_score.players (playerName, playerAvg, lastGame, highScore, totalGames) VALUES \
        ("' + playerName + '", "0", "0", "0", "0");'
    dbInsert(query)
    return ('', 204)

@app.route('/submitScore', methods=['POST'])
def submit_player_score():
    for player in request.json:
        playerId = str(player['playerId'])
        playerScore = str(player['playerScore'])
        query = 'UPDATE bowling_score.players SET lastGame = ' + playerScore + ' WHERE playerId = '+ playerId + '; '
        dbInsert(query)
    return ('', 204)

@app.route('/submitStats', methods=['POST'])
def submit_player_stats():
    for player in request.json:
        playerId = str(player[0]['playerId'])
        playerAvg = str(player[0]['playerAvg'])
        highScore = str(player[0]['highScore'])
        totalGames = str(player[0]['totalGames'])
        query = 'UPDATE bowling_score.players SET playerAvg = ' + playerAvg + ', highScore = ' + highScore + ', totalGames = ' + totalGames + ' WHERE playerId = '+ playerId
        dbInsert(query)
    return ('', 204)

@app.route('/deletePlayer', methods=['POST'])
def delete_player():
    playerId = str(request.json['playerId'])
    query = 'DELETE FROM bowling_score.players WHERE playerId = ' + playerId + ''
    dbInsert(query)
    return ('', 204)