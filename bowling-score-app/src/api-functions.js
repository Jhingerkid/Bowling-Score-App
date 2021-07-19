export function sendWinnerData(playerId, playerScore) {
  let data = { playerId: playerId, playerScore: playerScore };
  fetch("/submitScore", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}

export function createNewPlayer(playerName) {
  let data = { playerName: playerName };
  fetch("/newPlayer", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}

export function sendGameData(playersArray) {
  let data = playersArray.map(playerObj => ({ playerId: playerObj.playerId, playerScore: playerObj.playerTotal}))
  //send data to backend here
  return
}