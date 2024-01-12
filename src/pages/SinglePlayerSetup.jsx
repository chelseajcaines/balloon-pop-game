import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { avatarArray } from "/src/data/const"
import PlayerAvatar from "../components/PlayerAvatar"

const SignlePlayerSetup = () => {
    const [inputValue, setInputValue] = useState("")
    const [inputError, setInputError] = useState("")
    const [selectedAvatar, setSelectedAvatar] = useState("")

    const navigate = useNavigate()

    const handleInputValue = (e) => {
        setInputValue(e.target.value)
    }

    const getRandomAvatar = () => {
        const randomIndex = Math.floor(Math.random() * avatarArray.length)
        return avatarArray[randomIndex]
    }

    const handleAvatarClick = (avatar) => {
        setSelectedAvatar(avatar)
        localStorage.setItem("AVATAR_KEY", JSON.stringify(avatar))
    }

    useEffect(() => {
        const storedAvatar = localStorage.getItem("AVATAR_KEY")
        if (storedAvatar) {
            setSelectedAvatar(JSON.parse(storedAvatar))
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!inputValue) {
            setInputError("Please enter a name")
        } else if (!selectedAvatar) {
            const randomAvatar = getRandomAvatar()
            setSelectedAvatar(randomAvatar)
            localStorage.setItem("AVATAR_KEY", JSON.stringify(randomAvatar))
            setInputError("")
            navigate(`/Categories?name=${inputValue}`)
        } else {
            setInputError("")
            navigate(`/Categories?name=${inputValue}`)
        }
    }

    return (
        <>
            <h1>Single Player Setup</h1>
            <p>Choose your avatar</p>
            <AvatarGallery handleAvatarClick={handleAvatarClick} />
            <PlayerAvatar selectedAvatar={selectedAvatar} />
            <p>Enter name</p>
            <NameInput value={inputValue} onChange={handleInputValue} />
            <p style={{ color: "red" }}>{inputError}</p>
            <button onClick={handleSubmit}>Start Game</button>
        </>
    )
}

const NameInput = ({ inputValue, onChange }) => {
    return <input type="text" value={inputValue} onChange={onChange} />
}

const AvatarGallery = ({ handleAvatarClick }) => {
    return (
        <>
            {avatarArray.map((avatar) => (
                <img
                    key={avatar.id}
                    src={avatar.src}
                    alt={avatar.alt}
                    style={{ cursor: "pointer", margin: "10px" }}
                    onClick={() => handleAvatarClick(avatar)}
                />
            ))}
        </>
    )
}

export default SignlePlayerSetup
