import { useNavigate } from "react-router-dom"

const Categories = () => {
    const navigate = useNavigate()
    const nextPage = () => {
        navigate("/single-player-game-play")
    }

    return (
        <>
            <h1>Choose Puzzle Category</h1>
            <button onClick={nextPage}>Movie Titles</button>
        </>
    )
}

export default Categories
