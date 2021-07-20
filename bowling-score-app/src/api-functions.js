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
    playerId: playerObj.playerID,
    playerScore: playerObj.playerTotal,
  }));
  await fetch("/submitScore", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  let stuff = await getPlayerStats(data);
  var statUpdates = []; // I should use a .map but time constraints and bugs are rough, forgive me
  stuff.forEach((person) => {
    if (person[0].lastGame > person[0].highScore) {
      person[0].highScore = person[0].lastGame;
    }
    let a = person[0].playerAvg * person[0].totalGames;
    let b = person[0].lastGame;
    let c = person[0].totalGames + 1;
    let ab = a + b;
    person[0].totalGames = person[0].totalGames + 1;
    person[0].playerAvg = ab / c;
    statUpdates.push(person);
  });
  await fetch("/submitStats", {
    method: "POST",
    body: JSON.stringify(statUpdates),
    headers: { "Content-Type": "application/json" },
  });
  return;
}

async function getPlayerStats(data) {
  await fetch("/playerStats", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  let response = await fetch("/playerStats");
  let player = await response.json();
  return player;
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
