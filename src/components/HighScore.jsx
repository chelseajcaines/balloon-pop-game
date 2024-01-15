const HighScore = ({ highScore }) => {
    if (!highScore) return null

    return <div>High Score: {highScore}</div>
}

export default HighScore
