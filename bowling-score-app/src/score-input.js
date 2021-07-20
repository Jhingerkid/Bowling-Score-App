export const ScoreInput = ({gameData, setGameData, currentInputValue, setCurrentInputValue}) => {
    let messageText = `It's ${gameData.players[gameData.turn].playerName}'s Turn`
    if(gameData.winnerID){
      messageText = `${gameData.winnerName} has won the game, with ${gameData.winnerScore} points`
    }
    let pinsLeft  = gameData.players[gameData.turn].playerPins
    let inputBox = <input 
                        type="number" 
                        min="0" max={pinsLeft} 
                        value={currentInputValue} 
                        onChange={event => {
                            if(event.target.value <= pinsLeft){
                                setCurrentInputValue(event.target.value)
                            }
                            else{
                                setCurrentInputValue(pinsLeft)
                            }
                        }}
                    />
    let congratsText = " "
    if(gameData.congrats.length > 0){
      congratsText = gameData.congrats.map(note => <p>{note}</p>)
    }
    return <div>
        <h2>{messageText}</h2>
        {inputBox}
        <button onClick={() => recordScore(gameData, setGameData, currentInputValue, setCurrentInputValue)}>Submit</button>
        <div className="congrats-box">
          {congratsText}
        </div>
    </div>
}

const recordScore = (currentGameData, setCurrentGameData, inputValue, setInputValue) => {
    let newGameData = {...currentGameData};
    newGameData.addScore(Number(inputValue));
    setInputValue(0);
    setCurrentGameData(newGameData)
}