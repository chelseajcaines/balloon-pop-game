import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"

const Categories = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const playerName = params.get("name")

    const navigate = useNavigate()
    const movieTitles = () => {
        navigate(`/SinglePlayerGamePlay?name=${playerName}`)
    }

    return (
        <>
            <h1>Choose Puzzle Category</h1>
            <button onClick={movieTitles}>Movie Titles</button>
        </>
    )
}

export default Categories
