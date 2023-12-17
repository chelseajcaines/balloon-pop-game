import AvatarGallery from "../avatar-gallery"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function ComputerPlayerInfo() {
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
            <h1>Playing Against Computer</h1>
            <p>Choose your avatar</p>
            <AvatarGallery />
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
