export const ScoreCard = ({gameData}) => {
    let rows = gameData.players.map((playerObj) => <PlayerRow playerObj={playerObj} />)
    return <table className="score-card">
        <thead>
            <tr>
                <th colspan="1">Player Name</th>
                <th colspan="2">Round 1</th>
                <th colspan="2">Round 2</th>
                <th colspan="2">Round 3</th>
                <th colspan="2">Round 4</th>
                <th colspan="2">Round 5</th>
                <th colspan="2">Round 6</th>
                <th colspan="2">Round 7</th>
                <th colspan="2">Round 8</th>
                <th colspan="2">Round 9</th>
                <th colspan="3">Round 10</th>
                <th colspan="1">Total Score</th>
            </tr>
        </thead>
        {rows}
    </table>
}


const PlayerRow = ({playerObj}) => {
    let chanceScores = playerObj.playerFrames.scores.map(chanceScore => <td>{chanceScore}</td>)
    let frameTotals = playerObj.playerFrames.totals.map(frameTotal => <td colSpan="2">{frameTotal}</td>)
    frameTotals.splice(9, 1, <td colSpan="3">{playerObj.playerFrames.totals[9]}</td>)
    return <tbody id={`player-${playerObj.playerID}`} >
        <tr>
            <td className="player-name" rowSpan="2"> {playerObj.playerName} </td>
            {chanceScores}
            <td className="player-total" rowSpan="2">{playerObj.playerTotal}</td>
        </tr>
        <tr>
            {frameTotals}
        </tr>
    </tbody>
}