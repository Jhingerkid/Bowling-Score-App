import { useState, useEffect } from "react";
import Modal from './Modal.js';
import "./App.css";

function App() {
  const [activeGame, setActiveGame] = useState(false);
  const [newPlayer, setNewPlayer] = useState(false);
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

  
  // This useEffect just puts each current player into a li for rendering 
  let currentPlayerList
  useEffect(() => {
    currentPlayerList = []
    for (let player of currentPlayerList) {
      currentPlayerList.push(<li>{player}</li>)
    }
    return currentPlayerList;
  }, [currentPlayers]);

  const newPlayerModal = <div>
    <h3>Enter New Player Name:<input type="text" placeholder="Name"></input></h3>
    {/* the next button should submit the name to make a new player */}
    <button onClick={() => setNewPlayer(false)}>Submit</button>
  </div>

  function add() {
    setCurrentPlayers("Bob");
    console.log(currentPlayers)
  }



  return (
    <div className="App">
      <header className="App-header">
        <p>This is just an example of SQL data: {playaData.playerName}</p>
        <div>
          {activeGame ? (
            <div>
              <p>Game Started!</p>
              <button onClick={() => setActiveGame(false)}>End Game</button>
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
              <ol>{currentPlayerList}</ol>
            <button onClick={() => add()}>Delete Player</button>
            <button onClick={() => setNewPlayer(true)}>New Player</button>
            <button onClick={() => setActiveGame(true)}>Start Game</button>
          </div> }
        </div>
      </header>
    </div>
  );
}

export default App;
