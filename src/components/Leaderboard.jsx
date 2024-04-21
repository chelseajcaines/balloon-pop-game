import { useEffect } from "react"
import "/src/App.css"

const Leaderboard = () => {
    useEffect(() => {
        const leaderboardData =
            JSON.parse(localStorage.getItem("leaderboard")) || []
        leaderboardData.splice(3)
        localStorage.setItem("leaderboard", JSON.stringify(leaderboardData))
    }, [])

    const leaderboardData =
        JSON.parse(localStorage.getItem("leaderboard")) || []

    // Function to generate rows for the leaderboard
    const generateRows = () => {
        const rows = []
        for (let i = 0; i < 10; i++) {
            const entry = leaderboardData[i]
            const rowColor = i % 2 === 0 ? "even-row" : "odd-row" // Alternate row colors
            rows.push(
                <tr key={i} className={rowColor}>
                    <td className="rank">{i + 1}</td>
                    <td className="name">{entry ? entry.name : "-"}</td>
                    <td className="score">{entry ? entry.score : "-"}</td>
                </tr>
            )
        }
        return rows
    }

    return (
        <div className="leaderboardContainer">
            <div className="tableBorder">
                <div className="leaderboardBackground">
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="3">Leaderboard</th>
                            </tr>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>{generateRows()}</tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Leaderboard
