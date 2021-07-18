from flask import Flask, request
import pymysql
import json


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


@app.route('/submitScore', methods=['POST'])
def submit_player_score():
    playerId = str(request.json['playerId'])
    playerScore = str(request.json['playerScore'])
    query = 'UPDATE bowling_score.players SET lastGame = ' + playerScore + ' WHERE playerId = '+ playerId
    dbInsert(query)
    return ('', 204)
