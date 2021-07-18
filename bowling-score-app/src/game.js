export class game {
    players;
    shot;
    frame;
    turn;
    firstShot;
    winnerID;
    winnerName;
    winnerScore;
    addScore;
    nextTurn;
    getWinner;

    constructor(playersArray){
        this.players = playersArray.map(entry => new player(entry.id, entry.name));
        this.shot = 0;
        this.frame = 0;
        this.turn = 0;
        this.firstShot = true;
        this.winnerID = null;
        this.winnerName = null;
        this.winnerScore = null;
        this.addScore = this.addScore;
        this.nextTurn = this.nextTurn;
        this.getWinner = this.getWinner;
    }

    addScore(scoreInput) {
        let playerScoring = this.players[this.turn];
        let shotIndex = this.shot;
        let frameIndex = this.frame
        if(this.firstShot){
            playerScoring.playerPins -= scoreInput
            if(shotIndex > 0){
                playerScoring.playerFrames.totals[frameIndex] = playerScoring.playerFrames.totals[frameIndex - 1]
            }
        }
        playerScoring.playerFrames.scores[shotIndex] = scoreInput
        playerScoring.playerFrames.totals[frameIndex] = scoreInput + Number(playerScoring.playerFrames.totals[frameIndex])
        playerScoring.playerTotal = playerScoring.playerFrames.totals[frameIndex]
        this.nextTurn()
        return
    }

    nextTurn(){
        this.turn += 1;
        if(this.turn > (this.players.length - 1)){
            console.log("starting new round")
            this.turn = 0;
            this.shot += 1;
            console.log(`Shot Index is ${this.shot}`)
            if(this.shot > 19){
                console.log("looking for winner")
                this.getWinner()
            }
            this.firstShot = !(this.firstShot)
            if(this.firstShot){
                console.log("first shot")
                this.frame += 1
                this.players.forEach(playerObj => (playerObj.playerPins = 10))
            }
        }
        return
    }
    
    getWinner(){
        this.winnerScore = 0
        for(let playerObj of this.players){
            console.log(`Checking ${playerObj.playerName}'s score of ${playerObj.playerTotal}`)
            if(playerObj.playerTotal > this.winnerScore){
                this.winnerScore = playerObj.playerTotal
                this.winnerID = playerObj.playerID
                this.winnerName = playerObj.playerName
            }
        }
        return
    }
}

class player {
    playerID;
    playerName;
    playerPins;
    playerFrames;
    playerSpares;
    playerStrikes;
    playerTotal;

    constructor(playerID, playerName){
        this.playerID = playerID;
        this.playerName = playerName;
        this.playerPins = 10;
        this.playerFrames = {
            "scores":[
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
            ],
            "totals": [
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                "",
                ""
            ]
        };
        this.playerStrikes = {};
        this.playerSpares = {};
        this.playerTotal = 0;
    }
}