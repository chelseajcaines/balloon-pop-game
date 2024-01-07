import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"

const Categories = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const playerName = params.get("name")

    const navigate = useNavigate()
    const nextPage = () => {
        navigate(`/single-player-game-play?name=${playerName}`)
    }

    return (
        <>
            <h1>Choose Puzzle Category</h1>
            <button onClick={nextPage}>Movie Titles</button>
        </>
    )
}

export default Categories
