const HighScore = ({ highScore }) => {
    if (highScore === null) return "High Score: 0"
    return <div>High Score: {highScore}</div>
}

export default HighScore
