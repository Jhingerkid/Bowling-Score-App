import { useState } from "react";
import './App.css';

function App() {
  const [activeGame, setActiveGame] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          {activeGame ? <div>
            <p>Game Started!</p>
            <button onClick={() => setActiveGame(false)}>End Game</button>
          </div>
        : <div>
            <button onClick={() => setActiveGame(true)}>Start Game</button>
          </div> }
        </div>

      </header>
    </div>
  );
}

export default App;
