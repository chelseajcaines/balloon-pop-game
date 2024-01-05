import { useLocation } from "react-router-dom"

const PlayerName = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const playerName = params.get("name")

    return (
        <div>
            <p>Player Name: {playerName}</p>
        </div>
    )
}

export default PlayerName
