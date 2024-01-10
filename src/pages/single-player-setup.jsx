import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { avatarArray } from "/src/data/const"
import AvatarContext from "/src/contexts/AvatarContext"

const SignlePlayerSetup = () => {
    const [inputValue, setInputValue] = useState("")
    const [inputError, setInputError] = useState("")

    const { selectedAvatar, setSelectedAvatar } = useContext(AvatarContext)
    const handleAvatarClick = (avatar) => {
        setSelectedAvatar(avatar)
    }

    const navigate = useNavigate()

    const handleInputValue = (e) => {
        setInputValue(e.target.value)
    }

    const getRandomAvatar = () => {
        const randomIndex = Math.floor(Math.random() * avatarArray.length)
        return avatarArray[randomIndex]
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!inputValue) {
            setInputError("Please enter a name")
        } else if (!selectedAvatar) {
            const randomAvatar = getRandomAvatar()
            setSelectedAvatar(randomAvatar)
            setInputError("")
            navigate(`/categories?name=${inputValue}`)
        } else {
            setInputError("")
            navigate(`/categories?name=${inputValue}`)
        }
    }

    return (
        <>
            <h1>Single Player Setup</h1>
            <p>Choose your avatar</p>
            <AvatarGallery handleAvatarClick={handleAvatarClick} />
            <PlayerAvatar />
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

const PlayerAvatar = () => {
    const { selectedAvatar } = useContext(AvatarContext)

    if (!selectedAvatar) return null

    return (
        <div>
            <h3>Selected Avatar</h3>
            <img src={selectedAvatar.src} alt={selectedAvatar.alt} />
        </div>
    )
}

export default SignlePlayerSetup
