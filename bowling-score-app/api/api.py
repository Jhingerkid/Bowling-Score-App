from flask import Flask
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