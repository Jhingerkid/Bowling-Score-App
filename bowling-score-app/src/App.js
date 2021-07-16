import { useState, useEffect } from "react";
import Modal from './Modal.js';
import "./App.css";
import {ScoreCard} from "./score-card";
import {activePlayer} from "./active-player"

function App() {
  const [activeGame, setActiveGame] = useState(false);
  const [gameData, setGameData] = useState({});
  const [playaData, setPlayaData] = useState([]);
  const [newPlayer, setNewPlayer] = useState(false);

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

  const newPlayerModal = <div>
    <h3>Enter New Player Name:<input type="text" placeholder="Name"></input></h3>
    {/* the next button should submit the name to make a new player */}
    <button onClick={() => setNewPlayer(false)}>Submit</button>
  </div>



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
          ) : newPlayer ? <div>
          <Modal onClose={() => setNewPlayer(false)} show={newPlayer} title={"Create New Player"}>
          {newPlayerModal}
          </Modal>
        </div>
        : <div>
            <h1>Select Players</h1>
            <table>
              <tr>
                <th>Name</th>
                <th>Average Score</th>
                <th>Total Games Played</th>
                <th>Highscore</th>
                <th>Select</th>
              </tr>
            </table>
            <h2>Currently Selected Players:</h2>

            <button>Delete Player</button>
            <button onClick={() => setNewPlayer(true)}>New Player</button>
            <button onClick={startGame}>Start Game</button>
          </div> }
        </div>
      </header>
    </div>
  );
}

export default App;
