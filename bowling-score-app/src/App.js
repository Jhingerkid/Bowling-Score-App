import { useState, useEffect } from "react";
import Modal from "./Modal.js";
import "./App.css";
import { ScoreCard } from "./score-card";
import { game } from "./game";
import { ScoreInput } from "./score-input";
import { sendWinnerData, createNewPlayer } from "./api-functions";

function App() {
  const [activeGame, setActiveGame] = useState(false);
  const [newPlayer, setNewPlayer] = useState(false);
  const [buttonInput, setButtonInput] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState(0);
  const [deletePlayer, setDeletePlayer] = useState(false);
  const [gameData, setGameData] = useState({});
  const [playaData, setPlayaData] = useState([]); // using dummy data above
  // const [currentPlayers, setCurrentPlayers] = useState([]);
  const currentPlayers = [];

  // This is a dummy array for testing purposes. Ready for Leaf to replace with an array built from the selection screen.
  // Just let me know if you use a different format, and I'll change my functions to match.
  const currentPlayersArray = playaData;

  const startGame = () => {
    // you should be able to replace the variable "currentPlayersArray" with "currentPlayers" and have it work fine
    // (assuming my untested code works properly, hahae)
    let newGameData = new game(currentPlayersArray);
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

  useEffect(() => {
    async function getPlayerData() {
      let response = await fetch("/players");
      let player = await response.json();
      console.log(player);
      setPlayaData(player);
    }
    getPlayerData();
  }, []);

  // This useEffect just puts each current player into a <li> for rendering
  let currentPlayerList = [];
  useEffect(() => {
    for (let player of currentPlayers) {
      currentPlayerList.push(<li>{player}</li>);
    }
    return currentPlayerList;
  }, [currentPlayers]);

  function addCurrentPlayer(playerName, playerID, value) {
    if (value === "yes") {
      console.log("made it to the add part of function");
      currentPlayers.push({ name: playerName, id: playerID });
    }
    else if (value === "no") {
      console.log("made it to the remove part of function");
      const index = currentPlayers.indexOf(playerID);
      if (index > -1) {
        currentPlayers.splice(index, 1);
      }
    }
  }

  const newPlayerModal = (
    <div>
      <form>
        <h3>
          Enter New Player Name:<input type="text" placeholder="Name"></input>
        </h3>
        <button
          type="submit"
          onSubmit={() => setNewPlayer(false)}
          // , createNewPlayer("Mike")
        >
          Submit
        </button>
      </form>
    </div>
  );

  const deletePlayerModal = (
    <div>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Delete?</th>
          </tr>
        </thead>
        <tbody>
          {console.log("delModal", playaData)}
          {playaData.map((player) => (
            <tr>
              <td>{player.playerName}</td>
              <td>
                <form action="/deletePlayer" method="POST">
                  <input
                    value="Delete"
                    type="submit"
                    name={player.playerID}
                  ></input>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

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
                  {playaData.map((player) => (
                    <tr>
                      <td>{player.playerName}</td>
                      <td>{player.playerAvg}</td>
                      <td>{player.totalGames}</td>
                      <td>{player.lastGame}</td>
                      <td>{player.highScore}</td>
                      <td>
                        <form
                          action="addCurrentPlayer(player.playerName, player.playerID, value)"
                          method="POST"
                        >
                          <input
                            type="hidden"
                            value="no"
                            name={player.playerID}
                          ></input>
                          <input
                            type="checkbox"
                            value="yes"
                            name={player.playerID}
                            onChange={() => addCurrentPlayer(player.playerName, player.playerID, this.value)}
                          ></input>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h2>Search for a Player</h2>
              <form action="/searchForPlayers" method="GET">
                <input type="text" placeholder="Search..."></input>
                <input type="submit" on value="See Results"></input>
              </form>
              {/* <ol>
                  {searchedPlayers.map((player) =>
                  <li>{player.playerName}</li>
                  )}
              </ol> */}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
