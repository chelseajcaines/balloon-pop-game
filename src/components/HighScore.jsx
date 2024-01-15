const HighScore = ({ highScore }) => {
    if (!bestScore) return null

    return <div>High Score: {highScore}</div>
}

export default HighScore
