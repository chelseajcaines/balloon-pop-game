const BestScore = ({ bestScore }) => {
    if (!bestScore) return null

    return <div>Best Score: {bestScore}</div>
}

export default BestScore
