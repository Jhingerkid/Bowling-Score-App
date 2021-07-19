export const ScoreInput = ({gameData, setGameData, buttonInput, setButtonInput, currentInputValue, setCurrentInputValue}) => {
    let inputBox = null;
    let messageText = `It's ${gameData.players[gameData.turn].playerName}'s Turn`
    let pinsLeft  = gameData.players[gameData.turn].playerPins
    if(buttonInput){
        inputBox = <p>Button input is not implemented yet!</p>
    }
    else{
        inputBox = <input 
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
    }
    if(gameData.winnerID){
        messageText = `${gameData.winnerName} has won the game, with ${gameData.winnerScore} points`
    }
    return <div>
        <h2>{messageText}</h2>
        {inputBox}
        <button onClick={() => recordScore(gameData, setGameData, currentInputValue, setCurrentInputValue)}>Submit</button>
        <button onClick={() => setButtonInput(!(buttonInput))}>Change Input Type</button>
    </div>
}

const recordScore = (currentGameData, setCurrentGameData, inputValue, setInputValue) => {
    let newGameData = {...currentGameData};
    newGameData.addScore(Number(inputValue));
    setInputValue(0);
    setCurrentGameData(newGameData)
}