import { useState, useEffect } from "react";
import Modal from "./Modal.js";
import "./App.css";
import { ScoreCard } from "./score-card";
import { game } from "./game";
import { ScoreInput } from "./score-input";
import {
  sendWinnerData,
  createNewPlayer,
  sendGameData,
  deletePlayerDB,
} from "./api-functions";

function App() {
  const [activeGame, setActiveGame] = useState(false);
  const [newPlayer, setNewPlayer] = useState(false);
  const [buttonInput, setButtonInput] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState(0);
  const [deletePlayer, setDeletePlayer] = useState(false);
  const [gameData, setGameData] = useState({});
  const [playaData, setPlayaData] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [currentPlayers, setCurrentPlayers] = useState([]);

  async function getPlayerData() {
    let response = await fetch("/players");
    let player = await response.json();
    console.log("playadata was fetched", player);
    setPlayaData(player);
  }

  function updateNewPlayer() {
    createNewPlayer(newPlayerName);
    getPlayerData();
    setNewPlayer(false);
  }

  function updateCurrentPlayers(playerId, playerName) {
    var newCurrentPlayers = [];
    let newCurPlayer = { playerName: playerName, playerId: playerId };
    currentPlayers.forEach((player) => {
      if (playerId === player.playerId) {
        console.log("is a dupe");
        newCurrentPlayers = currentPlayers.filter(
          (curPlayer) => curPlayer.playerId !== playerId
        );
        setCurrentPlayers(newCurrentPlayers);
      } else {
        console.log("not a dupe");
        newCurrentPlayers.push(newCurPlayer);
        setCurrentPlayers(newCurrentPlayers);
      }
    });
  }

  useEffect(() => {
    console.log("current players", currentPlayers);
  }, [currentPlayers]);

  const startGame = () => {
    // you should be able to replace the variable "currentPlayersArray" with "currentPlayers" and have it work fine
    // (assuming my untested code works properly, hahae)
    let newGameData = new game(currentPlayers);
    setGameData(newGameData);
    setActiveGame(true);
  };

  const exitGame = async () => {
    if (gameData.winnerID) {
      await sendGameData(gameData.players);
    }
    setGameData({});
    setActiveGame(false);
  };

  useEffect(() => {
    getPlayerData();
  }, []);

  const newPlayerModal = (
    <div>
      <h3>
        Enter New Player Name:
        <input
          value={newPlayerName}
          type="text"
          placeholder="Name"
          onInput={(e) => setNewPlayerName(e.target.value)}
        ></input>
      </h3>
      <button onClick={() => updateNewPlayer()}>Submit</button>
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
          {playaData.map((player) => (
            <tr>
              <td>{player.playerName}</td>
              <td>
                <input
                  value="Delete"
                  type="button"
                  name={player.playerId}
                  onClick={() =>
                    deletePlayerDB(player.playerId, playaData, setPlayaData)
                  }
                ></input>
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
                        <input
                          type="hidden"
                          value="no"
                          name={player.playerId}
                        ></input>
                        <input
                          value="yes"
                          type="checkbox"
                          name={player.playerId}
                          onClick={() =>
                            updateCurrentPlayers(
                              player.playerId,
                              player.playerName
                            )
                          }
                        ></input>
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
              {/* <span>{currentPlayers}</span> */}
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
