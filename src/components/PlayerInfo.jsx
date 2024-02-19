import "/src/App.css"
import Avatar from "/src/components/Avatar"
import Button from "/src/components/Button"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { avatars } from "/src/data/const.js"

const PlayerInfo = ({ singlePlayer, playerOne, playerTwo, onClick }) => {
    const [activeAvatar, setActiveAvatar] = useState(0)
    const [selectedAvatar, setSelectedAvatar] = useState("")
    const [avatarError, setAvatarError] = useState("")
    const [inputFocus, setInputFocus] = useState(false)
    const [inputError, setInputError] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [playerOneReady, setPlayerOneReady] = useState(false)
    const [playerTwoReady, setPlayerTwoReady] = useState(false)

    const navigate = useNavigate()

    const inputRef = useRef(null)

    const handleMouseEnter = (avatarId) => {
        setActiveAvatar(avatarId)
    }

    const handleAvatarClick = (avatar) => {
        setSelectedAvatar(avatar)
        setAvatarError("")
        setInputFocus(true)
        inputRef.current.focus()
    }

    const handleInputChange = (e) => {
        setInputError("")
        setInputValue(e.target.value)
    }

    const handleClickSinglePlayer = (e) => {
        e.preventDefault()
        if (!inputValue && !selectedAvatar) {
            setInputError("Please enter a name")
            setAvatarError("Please select avatar")
        } else if (!selectedAvatar && inputValue) {
            setAvatarError("Please select avatar")
            setInputError("")
        } else if (selectedAvatar && !inputValue) {
            setAvatarError("")
            setInputError("Please enter a name")
        } else {
            setInputError("")
            setAvatarError("")
            localStorage.setItem("AVATAR_KEY", JSON.stringify(selectedAvatar))
            navigate(`/SinglePlayer/Categories?name=${inputValue}`)
        }
    }

    const handleClickPlayerOne = (e) => {
        e.preventDefault()
        if (!inputValue && !selectedAvatar) {
            setInputError("Please enter a name")
            setAvatarError("Please select avatar")
        } else if (!selectedAvatar && inputValue) {
            setAvatarError("Please select avatar")
            setInputError("")
        } else if (selectedAvatar && !inputValue) {
            setAvatarError("")
            setInputError("Please enter a name")
        } else {
            setInputError("")
            setAvatarError("")
            localStorage.setItem(
                "PLAYER_ONE_AVATAR_KEY",
                JSON.stringify(selectedAvatar)
            )
            localStorage.setItem(
                "PLAYER_ONE_NAME_KEY",
                JSON.stringify(inputValue)
            )
            setPlayerOneReady(true)
        }
    }

    const handleClickPlayerTwo = (e) => {
        e.preventDefault()
        if (!inputValue && !selectedAvatar) {
            setInputError("Please enter a name")
            setAvatarError("Please select avatar")
        } else if (!selectedAvatar && inputValue) {
            setAvatarError("Please select avatar")
            setInputError("")
        } else if (selectedAvatar && !inputValue) {
            setAvatarError("")
            setInputError("Please enter a name")
        } else {
            setInputError("")
            setAvatarError("")
            localStorage.setItem(
                "PLAYER_TWO_AVATAR_KEY",
                JSON.stringify(selectedAvatar)
            )
            localStorage.setItem(
                "PLAYER_TWO_NAME_KEY",
                JSON.stringify(inputValue)
            )
            setPlayerTwoReady(true)
        }
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight" && !inputFocus) {
                const currentIndex = avatars.findIndex(
                    (avatar) => avatar.id === activeAvatar
                )
                const newIndex = currentIndex + 1
                if (newIndex < avatars.length) {
                    setActiveAvatar(avatars[newIndex].id)
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [activeAvatar])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft") {
                const currentIndex = avatars.findIndex(
                    (avatar) => avatar.id === activeAvatar
                )
                const newIndex = currentIndex - 1
                setActiveAvatar(avatars[newIndex].id)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [activeAvatar])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter" && activeAvatar !== "") {
                const selected = avatars.find(
                    (avatar) => avatar.id === activeAvatar
                )
                if (selected) {
                    setSelectedAvatar(selected)
                }
                setAvatarError("")
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [activeAvatar])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowDown" && selectedAvatar) {
                inputRef.current.focus()
                setActiveAvatar("")
                setInputFocus(true)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [selectedAvatar])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight" && inputFocus) {
                setActiveAvatar("")
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [inputFocus])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft" && inputFocus) {
                setActiveAvatar("")
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [inputFocus])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowUp" && inputFocus) {
                setActiveAvatar(avatars[0].id)
                setInputFocus(false)
                inputRef.current.blur()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [inputFocus])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter" && inputFocus) {
                setInputError("Please enter a name")
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [inputFocus])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                e.key === "Enter" &&
                inputFocus &&
                inputValue &&
                selectedAvatar
            ) {
                setInputError("")
                setAvatarError("")
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [inputFocus, inputValue, selectedAvatar])

    return (
        <>
            <div
                className={
                    (playerOne && playerOneReady) ||
                    (playerTwo && playerTwoReady)
                        ? "disable"
                        : ""
                }
            >
                <p className="title">Choose your avatar</p>

                <div className="avatarGallery">
                    {avatars.map((avatar) => (
                        <Avatar
                            key={avatar.id}
                            src={avatar.src}
                            alt={avatar.alt}
                            onMouseEnter={() => handleMouseEnter(avatar.id)}
                            onClick={() => handleAvatarClick(avatar)}
                            activeAvatar={activeAvatar === avatar.id}
                        />
                    ))}
                </div>

                <div className="selectedAvatarContainer">
                    {selectedAvatar && (
                        <img
                            className="selectedAvatar"
                            src={selectedAvatar.src}
                            alt={selectedAvatar.alt}
                        />
                    )}
                </div>

                <p style={{ color: "red" }} className="title">
                    {avatarError}
                </p>

                <p className="title">Enter name</p>

                <div className="input">
                    <input
                        type="text"
                        onChange={handleInputChange}
                        ref={inputRef}
                    />
                </div>

                <p style={{ color: "red" }} className="title">
                    {inputError}
                </p>

                <div className="buttonContainer" onClick={onClick}>
                    <Button
                        text="Ready"
                        onClick={
                            singlePlayer
                                ? handleClickSinglePlayer
                                : playerOne
                                ? handleClickPlayerOne
                                : playerTwo
                                ? handleClickPlayerTwo
                                : undefined
                        }
                        isActive={selectedAvatar && inputValue}
                    />
                </div>
            </div>
        </>
    )
}

export default PlayerInfo
