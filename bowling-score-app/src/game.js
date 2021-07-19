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
  nextShot;
  getWinner;

  constructor(playersArray) {
	this.players = playersArray.map(
	  (entry) => new player(entry.id, entry.playerName)
	);
	this.shot = 0;
	this.frame = 0;
	this.turn = 0;
	this.firstShot = true;
	this.winnerID = null;
	this.winnerName = null;
	this.winnerScore = null;
	this.addScore = this.addScore;
	this.nextShot = this.nextShot;
	this.getWinner = this.getWinner;
  }

  addScore(scoreInput) {
	let activePlayer = this.players[this.turn];
	let shotIndex = this.shot;
	let frameIndex = this.frame;
	let isStrike = false;
	let isSpare = false;
	// set remaining pin count and record strike or spare
	activePlayer.playerPins -= scoreInput;
	if (activePlayer.playerPins === 0) {
	  if (this.firstShot) {
		isStrike = true;
		activePlayer.playerStrikes.push(frameIndex);
	  } else {
		isSpare = true;
		activePlayer.playerSpares.push(frameIndex);
	  }
	}
	// see if previous strikes or spares are earning additional points based on this shot and add them
	if (activePlayer.playerStrikes.includes(frameIndex - 1)) {
	  activePlayer.playerFrames.totals[frameIndex - 1] += scoreInput;
	  if (this.firstShot === false) {
		activePlayer.playerFrames.totals[frameIndex] += scoreInput;
	  }
	}
	if (activePlayer.playerSpares.includes(frameIndex - 1) && this.firstShot) {
	  activePlayer.playerFrames.totals[frameIndex - 1] += scoreInput;
	}
	if (this.firstShot && shotIndex > 0) {
	  activePlayer.playerFrames.totals[frameIndex] =
		activePlayer.playerFrames.totals[frameIndex - 1];
	}
	if (isStrike) {
	  activePlayer.playerFrames.scores[shotIndex] = "X";
	} else if (isSpare) {
	  activePlayer.playerFrames.scores[shotIndex] = "/";
	} else if (scoreInput === 0) {
	  activePlayer.playerFrames.scores[shotIndex] = "-";
	} else {
	  activePlayer.playerFrames.scores[shotIndex] = scoreInput;
	}
	activePlayer.playerFrames.totals[frameIndex] =
	  scoreInput + Number(activePlayer.playerFrames.totals[frameIndex]);
	activePlayer.playerTotal = activePlayer.playerFrames.totals[frameIndex];
	this.nextShot();
	// if the next player just scored a strike, skip their shot and mark the field with "-"
	while (this.players[this.turn].playerPins === 0) {
	  this.players[this.turn].playerFrames.scores[this.shot] = "-";
	  this.nextShot();
	}
	return;
  }

  nextShot() {
	if(this.firstShot){
		this.shot += 1;
		this.firstShot = false;
		if(this.shot === 19 && this.players[this.turn].playerPins === 0){
			this.players[this.turn].playerPins = 10;
		}
		return;
	}
	//if we're on the second shot of the 10th frame, see if player is eligible to continue
	else if(this.shot === 19 && ((this.players[this.turn].playerFrames.scores[18] === "X") || (this.players[this.turn].playerFrames.scores[19] === "/"))){
		this.shot = 20;
		if(this.players[this.turn].playerPins === 0){
			this.players[this.turn].playerPins = 10;
		}
		return;
	}
	else{
		this.turn += 1;
		if (this.turn < this.players.length) {
			this.shot -= 1;
			if(this.shot === 19){
				this.shot = 18;
			}
			this.firstShot = true;
			return;
		}
		else if(this.shot < 18){
			console.log("starting new round");
			this.turn = 0;
			this.shot += 1;
			this.frame += 1;
			this.firstShot = true;
			this.players.forEach((playerObj) => (playerObj.playerPins = 10));
			console.log(`Frame index is ${this.frame}`)
			return;
		}
		else {
			console.log("looking for winner");
			this.getWinner();
			return;
	  }
	}
  }

  getWinner() {
	this.winnerScore = 0;
	for (let playerObj of this.players) {
	  console.log(
		`Checking ${playerObj.playerName}'s score of ${playerObj.playerTotal}`
	  );
	  if (playerObj.playerTotal > this.winnerScore) {
		this.winnerScore = playerObj.playerTotal;
		this.winnerID = playerObj.playerID;
		this.winnerName = playerObj.playerName;
	  }
	}
	this.turn = 0
	this.players.forEach((playerObj) => (playerObj.playerPins = 10));
	return;
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

  constructor(playerID, playerName) {
	this.playerID = playerID;
	this.playerName = playerName;
	this.playerPins = 10;
	this.playerFrames = {
	  scores: [
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
	  totals: ["", "", "", "", "", "", "", "", "", ""],
	};
	this.playerStrikes = [];
	this.playerSpares = [];
	this.playerTotal = 0;
  }
}
