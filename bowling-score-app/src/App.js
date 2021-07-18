import { useState, useEffect } from "react";
import Modal from "./Modal.js";
import { newPlayerModal, deletePlayerModal } from "./modal_pages.js";
import "./App.css";
import {ScoreCard} from "./score-card";
import { game } from "./game"
import { ScoreInput } from "./score-input";

function App() {
  const [activeGame, setActiveGame] = useState(false);
  const [gameData, setGameData] = useState({});
  const [playaData, setPlayaData] = useState([]);
  const [newPlayer, setNewPlayer] = useState(false);
  const [buttonInput, setButtonInput] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState(0);
  const [deletePlayer, setDeletePlayer] = useState(false);
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

  useEffect(() => {
    async function getPlayerData() {
      let response = await fetch("/players");
      let player = await response.json();
      setPlayaData(player[0]);
    }
    getPlayerData();
  }, []);
  // console.log("Object Information", playaData);

  // This useEffect just puts each current player into a <li> for rendering
  useEffect(() => {
    let currentPlayerList = [];
    for (let player of currentPlayers) {
      currentPlayerList.push(<li>{player}</li>);
    }
    return currentPlayerList;
  }, [currentPlayers]);

  // const newPlayerModal = <div>
  //   <h3>Enter New Player Name:<input type="text" placeholder="Name"></input></h3>
  //   {/* the next button should submit the name to make a new player */}
  //   <button onClick={() => setNewPlayer(false)}>Submit</button>
  // </div>

  // const deletePlayerModal = <div>
  //   {/* The player list variable from backend goes here */}
  //   {/* <input type="submit" onsubmit="setDeletePlayer(false)">Delete</input> */}
  //   <input type="checkbox"></input>
  //   <button onClick={() => setDeletePlayer(false)}>Delete</button>
  // </div>

  return (
    <div>
      <div className="menu-box">
        <p>This is just an example of SQL data: {playaData.playerName}</p>
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
                    <th>Highscore</th>
                    <th>Select</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>bob</td>
                    <td>22</td>
                    <td>2</td>
                    <td>60</td>
                    {/* the setCurrentPlayers useState below should dynamically select the right player */}
                    <td>
                      <button onClick={() => setCurrentPlayers("bob")}>
                        Select
                      </button>
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
      </div>
    </div>
  );
}

export default App;
