import { useEffect } from "react"

const Leaderboard = () => {
    useEffect(() => {
        const leaderboardData =
            JSON.parse(localStorage.getItem("leaderboard")) || []
        leaderboardData.splice(3)
        localStorage.setItem("leaderboard", JSON.stringify(leaderboardData))
    }, [])

    const leaderboardData =
        JSON.parse(localStorage.getItem("leaderboard")) || []
    return (
        <>
            <h2>Top Ten Leaderboard</h2>
            <ul>
                {leaderboardData.map((entry, index) => (
                    <li key={index}>
                        {index + 1}. {entry.name}: {entry.score}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Leaderboard
