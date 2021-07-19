import { useState, useEffect } from "react";
import Modal from './Modal.js';
import "./App.css";
import {ScoreCard} from "./score-card";
import { game } from "./game"
import { ScoreInput } from "./score-input";

function App() {
  const [activeGame, setActiveGame] = useState(false);
  const [newPlayer, setNewPlayer] = useState(false);
  const [buttonInput, setButtonInput] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState(0);
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
    let newGameData = new game(currentPlayersArray)
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

  function createNewPlayer(playerName) {
    let data = { playerName: playerName };
    fetch("/newPlayer", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
  }

  useEffect(() => {
    async function getPlayerData() {
      let response = await fetch("/players");
      let player = await response.json();
      console.log(player);
      setPlayaData(player[0]);
    }
    getPlayerData();
  }, []);
  console.log("Object Information", playaData);

  // This useEffect just puts each current player into a <li> for rendering
  let currentPlayerList = [];
  // useEffect(() => {
  //   for (let player of currentPlayers) {
  //     currentPlayerList.push(<li>{player}</li>);
  //   }
  //   return currentPlayerList;
  // }, [currentPlayers]);

  function addCurrentPlayer(name) {
    currentPlayerList.push(name)
  }

  const newPlayerModal = <div>
    <form action="/newPlayer" method="POST">
      <h3>Enter New Player Name:<input type="text" placeholder="Name"></input></h3>
      <button type="submit" onSubmit={() => setNewPlayer(false)}>Submit</button>
    </form>
  </div>

  const deletePlayerModal = <div>
    <table>
      <thead>
        <th>Player</th>
        <th>Delete?</th>
      </thead>
      <tbody>
        {playaData.map((player) =>
          <tr>
            <td>{player.playerName}</td>
            <td>
              <form action="/deletePlayer" method="POST">
                <input type="submit" name={player.playerID}>Delete</input>
              </form>
            </td>
          </tr>)}
      </tbody>
    </table>
  </div>

  return (
    <div>
      <div className="menu-box">
        <div>
          {/* This is what is shown during a game of bowling */}
          {activeGame ? (
            <div>
              <p>Game Started!</p>
              <ScoreInput 
                gameData={gameData}
                setGameData={setGameData}
                buttonInput={buttonInput}
                setButtonInput={setButtonInput}
                currentInputValue={currentInputValue}
                setCurrentInputValue={setCurrentInputValue}
              />
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
                    <td>
                      <form action="/currentPlayer" method="POST">
                        <input type="checkbox" name={player.playerID} onChange="this.form.submit();"></input>
                      </form>
                    </td>
                  </tr>)}
                  {/* this next <tr> is just test data */}
                  <tr>
                    <td>bob</td>
                    <td>22</td>
                    <td>2</td>
                    <td>60</td>
                    <td>70</td>
                    <td>
                      <button onClick={addCurrentPlayer("obby")}>Select</button>
                      {/* <form action="/currentPlayers" method="POST">
                        <input type="checkbox" onChange="this.form.submit();"></input>
                      </form> */}
                    </td>
                  </tr>
                </tbody>
              </table>
              <h2>Currently Selected Players:</h2>
              <ol>{currentPlayerList}</ol>
              <button onClick={() => setDeletePlayer(true)}>
                Delete Player
              </button>
              <button onClick={() => setNewPlayer(true)}>New Player</button>
              <button onClick={startGame}>Start Game</button>
              {/* both of these buttons below can be deleted, they're there for testing purposes now */}
              <button
                onClick={() => {
                  sendWinnerData(2, 200);
                }}
              >
                Send Score Test
              </button>
              <button
                onClick={() => {
                  createNewPlayer("Jimothy");
                }}
              >
                Add New Player Test
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
