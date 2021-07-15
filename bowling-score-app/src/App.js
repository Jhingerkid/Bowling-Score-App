import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
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
        <p>The current test player is {playaData.playerName}.</p>
      </header>
    </div>
  );
}

export default App;
