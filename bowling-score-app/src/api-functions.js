export const createNewPlayer = async (playerName) => {
  let data = { playerName: playerName };
  fetch("/newPlayer", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
};

export async function sendGameData(playersArray) {
  let data = playersArray.map((playerObj) => ({
    playerId: playerObj.playerId,
    playerScore: playerObj.playerTotal,
  }));
  console.log(getPlayerStats(data));
  console.log(data);
  fetch("/submitScore", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return;
}

async function getPlayerStats(data) {
  let playaStats = await fetch("/playerStats", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  let statistics = await playaStats.json();
  return statistics;
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
