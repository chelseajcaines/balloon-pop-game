import PlayerChoosesAvatar from "/src/components/Choose-avatar"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const ComputerPlayerInfo = () => {
    const navigate = useNavigate()
    const nextPage = () => {
        navigate("/computer-game-play")
    }
    const [inputValue, setInputValue] = useState("")
    const [error, setError] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!inputValue) {
            setError("Please enter a name")
        } else {
            setError("")
            nextPage()
        }
    }

    return (
        <>
            <h1>Player vs Computer - Player info</h1>
            <p>Choose your avatar</p>
            <PlayerChoosesAvatar />
            <p>Enter name</p>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <p style={{ color: "red" }}>{error}</p>
            <button onClick={handleSubmit}>Start Game</button>
        </>
    )
}

export default ComputerPlayerInfo
