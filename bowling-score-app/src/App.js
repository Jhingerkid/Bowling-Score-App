import { useState, useEffect } from "react";
import Modal from './Modal.js';
import { newPlayerModal, deletePlayerModal } from "./modal_pages.js";
import "./App.css";

function App() {
  const [activeGame, setActiveGame] = useState(false);
  const [newPlayer, setNewPlayer] = useState(false);
  const [deletePlayer, setDeletePlayer] = useState(false);
  const [playaData, setCurrentPlaya] = useState([]);
  const [currentPlayers, setCurrentPlayers] = useState([]);
  useEffect(() => {
    async function getPlayerData() {
      let response = await fetch("/players");
      let player = await response.json();
      setCurrentPlaya(player[0]);
    }
    getPlayerData();
  }, []);
  // console.log("Object Information", playaData);

  
  // This useEffect just puts each current player into a <li> for rendering 
  useEffect(() => {
    let currentPlayerList = []
    for (let player of currentPlayers) {
      currentPlayerList.push(<li>{player}</li>)
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
    <div className="App">
      <header className="App-header">
        <p>This is just an example of SQL data: {playaData.playerName}</p>
        <div>
          {/* This is what is shown during a game of bowling */}
          {activeGame ? (
            <div>
              <p>Game Started!</p>
              <button onClick={() => setActiveGame(false)}>End Game</button>
            </div>
          ) 
          // This is the page for creating a new player
          : newPlayer ? (
          <Modal onClose={() => setNewPlayer(false)} show={newPlayer} title={"Create New Player"}>
            {newPlayerModal}
          </Modal>
        )
        // This is the page for deleting a player
        : deletePlayer ? (
          <Modal onClose={() => setDeletePlayer(false)} show={deletePlayer} title={"Delete Player"}>
            {deletePlayerModal}
          </Modal>
        )
        // This is the home page where you navigate to whatever you need
        : <div>
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
                  <td><button onClick={() => setCurrentPlayers("bob")}>Select</button></td>
                </tr>
              </tbody>
            </table>
            <h2>Currently Selected Players:</h2>
              <ol>{currentPlayers}</ol>
            <button onClick={() => setDeletePlayer(true)}>Delete Player</button>
            <button onClick={() => setNewPlayer(true)}>New Player</button>
            <button onClick={() => setActiveGame(true)}>Start Game</button>
          </div> }
        </div>
      </header>
    </div>
  );
}

export default App;
