import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [activeGame, setActiveGame] = useState(false);
  const [playaData, setCurrentPlaya] = useState([]);
  useEffect(() => {
    async function getPlayerData() {
      let response = await fetch("/players");
      let player = await response.json();
      setCurrentPlaya(player[0]);
    }
    getPlayerData();
  }, []);
  console.log("Object Information", playaData);
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
          ) : (
            <div>
              <button onClick={() => setActiveGame(true)}>Start Game</button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
