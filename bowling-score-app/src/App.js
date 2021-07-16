import { useState, useEffect } from "react";
import "./App.css";
import {ScoreCard} from "./score-card";
import {activePlayer} from "./active-player"

function App() {
  const [activeGame, setActiveGame] = useState(false);
  const [gameData, setGameData] = useState({});
  const [playaData, setPlayaData] = useState([]);

  // This is a dummy array for testing purposes. Ready for Leaf to replace with an array built from the selection screen. 
  // Just let me know if you use a different format, and I'll change my functions to match.
  const currentPlayersArray = [
    {
      "name": "Jack",
      "id": 0
    },
    {
      "name": "Candace",
      "id": 1
    },
    {
      "name": "Dmitri",
      "id": 2
    }
  ]

  const startGame = () => {
    let newGameData = {};
    newGameData.players = currentPlayersArray.map(playerEntry => new activePlayer(playerEntry.id, playerEntry.name));
    newGameData.currentTurn = 0;
    newGameData.winnerID = null;
    newGameData.winnerScore = null;
    setGameData(newGameData);
    setActiveGame(true);
}

const exitGame =  async () => {
  if(gameData.winnerID){
    // sql call for tom to add
    // await sendWinnerData(gameData.winnerID, gameData.winnerScore);
  }
  setGameData({});
  setActiveGame(false);
}

  useEffect(() => {
    async function getPlayerData() {
      let response = await fetch("/players");
      let player = await response.json();
      setPlayaData(player[0]);
    }
    getPlayerData();
  }, []);
  console.log("Object Information", playaData);
  return (
    <div>
      <header>
        <p>This is just an example of SQL data: {playaData.playerName}</p>
        <div>
          {activeGame ? (
            <div>
              <p>Game Started!</p>
              <button onClick={exitGame}>End Game</button>
              <ScoreCard gameData={gameData} />
            </div>
          ) : (
            <div>
              <button onClick={startGame}>Start Game</button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
