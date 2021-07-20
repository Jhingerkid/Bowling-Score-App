from flask import Flask, request
import pymysql
import json
import time


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

@app.route('/playerStats', methods=['POST'])
def get_player_stats():
    print("playerstats",request.json)
    # # query = "SELECT * FROM bowling_score.players"
    # # response = dbGather(query)
    # return json.dumps(response)
    return ('', 204)


@app.route('/newPlayer', methods=['POST'])
def submit_new_player():
    playerName = request.json['playerName']
    query = 'INSERT INTO bowling_score.players (playerName, playerAvg, lastGame, highScore, totalGames) VALUES \
        ("' + playerName + '", "0", "0", "0", "0");'
    dbInsert(query)
    return ('', 204)

@app.route('/submitScore', methods=['POST'])
def submit_player_score():
    # runningQuery = ""
    for player in request.json:
        playerId = str(player['playerId'])
        playerScore = str(player['playerScore'])
        query = 'UPDATE bowling_score.players SET lastGame = ' + playerScore + ' WHERE playerId = '+ playerId + '; '
        dbInsert(query)
        # print("playerId", type(playerId), playerId)
        # print("playerScore", type(playerScore), playerScore)
        # print("query", type(query), query)
        # runningQuery = runningQuery + query
        # print("runningQuery", type(runningQuery), runningQuery)
    # print("beforeSend", runningQuery)
    # dbInsert(runningQuery) // the syntax is correct but for some reason it throws an error
    return ('', 204)

@app.route('/deletePlayer', methods=['POST'])
def delete_player():
    playerId = str(request.json['playerId'])
    query = 'DELETE FROM bowling_score.players WHERE playerId = ' + playerId + ''
    dbInsert(query)
    return ('', 204)