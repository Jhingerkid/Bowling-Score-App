import { useState, useEffect } from "react";
import Modal from './Modal.js';
import "./App.css";
import { ScoreCard } from "./score-card";
import { activePlayer } from "./active-player";

function App() {
  const [activeGame, setActiveGame] = useState(false);
  const [newPlayer, setNewPlayer] = useState(false);
  const [deletePlayer, setDeletePlayer] = useState(false);
  const [gameData, setGameData] = useState({});
  const [playaData, setPlayaData] = useState([]);
  // const [playaData, setCurrentPlaya] = useState([]);
  const [currentPlayers, setCurrentPlayers] = useState([]);

  // This is a dummy array for testing purposes. Ready for Leaf to replace with an array built from the selection screen.
  // Just let me know if you use a different format, and I'll change my functions to match.
  const currentPlayersArray = [
    {
      name: "Jack",
      id: 0,
    },
    {
      name: "Candace",
      id: 1,
    },
    {
      name: "Dmitri",
      id: 2,
    },
  ];

  const startGame = () => {
    let newGameData = {};
    newGameData.players = currentPlayersArray.map(
      (playerEntry) => new activePlayer(playerEntry.id, playerEntry.name)
    );
    newGameData.currentTurn = 0;
    newGameData.winnerID = null;
    newGameData.winnerScore = null;
    setGameData(newGameData);
    setActiveGame(true);
  };

  const exitGame = async () => {
    if (gameData.winnerID) {
      // sql call for tom to add
      // await sendWinnerData(gameData.winnerID, gameData.winnerScore);
    }
    setGameData({});
    setActiveGame(false);
  };

  function sendWinnerData(playerId, playerScore) {
    let data = { playerId: playerId, playerScore: playerScore };
    fetch("/submitScore", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
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

  // This useEffect just puts each current player into a <li> for rendering
  useEffect(() => {
    let currentPlayerList = [];
    for (let player of currentPlayers) {
      currentPlayerList.push(<li>{player}</li>);
    }
    return currentPlayerList;
  }, [currentPlayers]);

  const newPlayerModal = <div>
    <h3>Enter New Player Name:<input type="text" placeholder="Name"></input></h3>
    {/* the next button should submit the name to make a new player */}
    <button onClick={() => setNewPlayer(false)}>Submit</button>
  </div>

  const deletePlayerModal = <div>
    {/* The player list variable from backend goes here */}
    {/* <input type="submit" onsubmit="setDeletePlayer(false)">Delete</input> */}
    <input type="checkbox"></input>
    {/*there should be a function right after setDeletePlayer beneath here to remove
    the selected players from the sql database */}
    <button onClick={() => setDeletePlayer(false)}>Delete</button>
  </div>

  return (
    <div>
      <header>
        <p>This is just an example of SQL data: {playaData.playerName}</p>
        <div>
          {/* This is what is shown during a game of bowling */}
          {activeGame ? (
            <div>
              <p>Game Started!</p>
              <button onClick={exitGame}>End Game</button>
              <ScoreCard gameData={gameData} />
            </div>
          ) : // This is the page for creating a new player
          newPlayer ? (
            <Modal
              onClose={() => setNewPlayer(false)}
              show={newPlayer}
              title={"Create New Player"}
            >
              {newPlayerModal}
            </Modal>
          ) : // This is the page for deleting a player
          deletePlayer ? (
            <Modal
              onClose={() => setDeletePlayer(false)}
              show={deletePlayer}
              title={"Delete Player"}
            >
              {deletePlayerModal}
            </Modal>
          ) : (
            // This is the home page where you navigate to whatever you need
            <div>
              <h1>Select Players</h1>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Average Score</th>
                    <th>Total Games Played</th>
                    <th>Last Game Score</th>
                    <th>Highscore</th>
                    <th>Select</th>
                  </tr>
                </thead>
                <tbody>
                  {playaData.map((player) =>
                  <tr>
                    <td>{player.playerName}</td>
                    <td>{player.playerAvg}</td>
                    <td>{player.totalGames}</td>
                    <td>{player.lastGame}</td>
                    <td>{player.highScore}</td>
                    <td><input type="checkbox" name={player.playerID}></input></td>
                  </tr>)}
      
                  <tr>
                    <td>bob</td>
                    <td>22</td>
                    <td>2</td>
                    <td>60</td>
                    <td>70</td>
                    {/* the setCurrentPlayers useState below should dynamically select the right player */}
                    <td>
                      <form action="">
                        <input type="checkbox" onChange="this.form.submit();"></input>
                      </form>
                    </td>
                  </tr>
                </tbody>
              </table>
              <h2>Currently Selected Players:</h2>
              <ol>{currentPlayers}</ol>
              <button onClick={() => setDeletePlayer(true)}>
                Delete Player
              </button>
              <button onClick={() => setNewPlayer(true)}>New Player</button>
              <button onClick={startGame}>Start Game</button>
              <button
                onClick={() => {
                  sendWinnerData(2, 200);
                }}
              >
                Send Score Test
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
