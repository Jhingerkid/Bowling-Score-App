export function sendWinnerData(playerId, playerScore) {
  let data = { playerId: playerId, playerScore: playerScore };
  fetch("/submitScore", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}

export const createNewPlayer = async (playerName) => {
  let data = { playerName: playerName };
  fetch("/newPlayer", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

export function sendGameData(playersArray) {
  let data = playersArray.map((playerObj) => ({
    playerId: playerObj.playerId,
    playerScore: playerObj.playerTotal,
  }));
  //send data to backend here
  return;
}

export function deletePlayerDB(playerId, playaData, setPlayaData) {
  let data = { playerId: playerId };
  let newPlayaData = playaData.filter((playa) => playa.playerId != playerId);
  setPlayaData(newPlayaData);
  fetch("/deletePlayer", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
}
