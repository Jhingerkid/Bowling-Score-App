export class activePlayer {
    playerID;
    playerName;
    playerFrames;
    playerTotal;

    constructor(playerID, playerName) {
        this.playerID = playerID;
        this.playerName = playerName;
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
        this.playerTotal = 0;
    }
}