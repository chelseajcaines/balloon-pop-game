import { useNavigate } from "react-router-dom"
import { useState } from "react"
import ChooseAvatar from "/src/components/Choose-avatar"
import PlayerAvatar from "/src/components/PlayerAvatar"

const SignlePlayerSetup = () => {
    const [inputValue, setInputValue] = useState("")
    const [inputError, setInputError] = useState("")

    const navigate = useNavigate()
    const nextPage = () => {
        navigate(`/categories`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!inputValue) {
            setInputError("Please enter a name")
        } else {
            setInputError("")
            nextPage()
        }
    }

    return (
        <>
            <h1>Single Player Setup</h1>
            <p>Choose your avatar</p>
            <ChooseAvatar />
            <PlayerAvatar />
            <p>Enter name</p>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <p style={{ color: "red" }}>{inputError}</p>
            <button onClick={handleSubmit}>Start Game</button>
        </>
    )
}

export default SignlePlayerSetup

//navigate(`/single-player-game-play?name=${inputValue}`)
