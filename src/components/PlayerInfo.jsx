import "/src/App.css"
import Avatar from "/src/components/Avatar"
import Button from "/src/components/Button"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { avatars } from "/src/data/const.js"

const PlayerInfo = ({
    singlePlayer,
    playerOne,
    playerTwo,
    onClick,
    playerDisabled,
    setPlayerOneReady,
    setPlayerTwoReady,
}) => {
    const [activeAvatar, setActiveAvatar] = useState(0)
    const [selectedAvatar, setSelectedAvatar] = useState("")
    const [avatarError, setAvatarError] = useState("")
    const [inputFocus, setInputFocus] = useState(false)
    const [inputError, setInputError] = useState("")
    const [inputValue, setInputValue] = useState("")

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
        }
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                e.key === "ArrowRight" &&
                !inputFocus &&
                playerOne &&
                !playerDisabled
            ) {
                const currentIndex = avatars.findIndex(
                    (avatar) => avatar.id === activeAvatar
                )
                const newIndex = currentIndex + 1
                if (newIndex < avatars.length) {
                    setActiveAvatar(avatars[newIndex].id)
                }
            } else if (
                e.key === "ArrowRight" &&
                !inputFocus &&
                playerTwo &&
                !playerDisabled
            ) {
                const currentIndex = avatars.findIndex(
                    (avatar) => avatar.id === activeAvatar
                )
                const newIndex = currentIndex + 1
                if (newIndex < avatars.length) {
                    setActiveAvatar(avatars[newIndex].id)
                }
            } else if (e.key === "ArrowRight" && !inputFocus && singlePlayer) {
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
    }, [activeAvatar, playerOne, playerTwo, playerDisabled, singlePlayer])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft" && playerOne && !playerDisabled) {
                const currentIndex = avatars.findIndex(
                    (avatar) => avatar.id === activeAvatar
                )
                const newIndex = currentIndex - 1
                setActiveAvatar(avatars[newIndex].id)
            } else if (e.key === "ArrowLeft" && playerTwo && !playerDisabled) {
                const currentIndex = avatars.findIndex(
                    (avatar) => avatar.id === activeAvatar
                )
                const newIndex = currentIndex - 1
                setActiveAvatar(avatars[newIndex].id)
            } else if (e.key === "ArrowLeft" && singlePlayer) {
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
    }, [activeAvatar, playerOne, playerTwo, playerDisabled, singlePlayer])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                e.key === "Enter" &&
                activeAvatar !== "" &&
                playerOne &&
                !playerDisabled
            ) {
                const selected = avatars.find(
                    (avatar) => avatar.id === activeAvatar
                )
                if (selected) {
                    setSelectedAvatar(selected)
                }
                setAvatarError("")
            } else if (
                e.key === "Enter" &&
                activeAvatar !== "" &&
                playerTwo &&
                !playerDisabled
            ) {
                const selected = avatars.find(
                    (avatar) => avatar.id === activeAvatar
                )
                if (selected) {
                    setSelectedAvatar(selected)
                }
                setAvatarError("")
            } else if (
                e.key === "Enter" &&
                activeAvatar !== "" &&
                singlePlayer
            ) {
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
    }, [activeAvatar, playerOne, playerTwo, playerDisabled, singlePlayer])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                e.key === "ArrowDown" &&
                selectedAvatar &&
                playerOne &&
                !playerDisabled
            ) {
                inputRef.current.focus()
                setActiveAvatar("")
                setInputFocus(true)
            } else if (
                e.key === "ArrowDown" &&
                selectedAvatar &&
                playerTwo &&
                !playerDisabled
            ) {
                inputRef.current.focus()
                setActiveAvatar("")
                setInputFocus(true)
            } else if (
                e.key === "ArrowDown" &&
                selectedAvatar &&
                singlePlayer
            ) {
                inputRef.current.focus()
                setActiveAvatar("")
                setInputFocus(true)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [selectedAvatar, playerOne, playerTwo, playerDisabled, singlePlayer])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                e.key === "ArrowRight" &&
                inputFocus &&
                playerOne &&
                !playerDisabled
            ) {
                setActiveAvatar("")
            } else if (
                e.key === "ArrowRight" &&
                inputFocus &&
                playerTwo &&
                !playerDisabled
            ) {
                setActiveAvatar("")
            } else if (e.key === "ArrowRight" && inputFocus && singlePlayer) {
                setActiveAvatar("")
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [inputFocus, playerOne, playerTwo, playerDisabled, singlePlayer])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                e.key === "ArrowLeft" &&
                inputFocus &&
                playerOne &&
                !playerDisabled
            ) {
                setActiveAvatar("")
            } else if (
                e.key === "ArrowLeft" &&
                inputFocus &&
                playerTwo &&
                !playerDisabled
            ) {
                setActiveAvatar("")
            } else if (e.key === "ArrowLeft" && inputFocus && singlePlayer) {
                setActiveAvatar("")
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [inputFocus, playerOne, playerTwo, playerDisabled, singlePlayer])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                e.key === "ArrowUp" &&
                inputFocus &&
                playerOne &&
                !playerDisabled
            ) {
                setActiveAvatar(avatars[0].id)
                setInputFocus(false)
                inputRef.current.blur()
            } else if (
                e.key === "ArrowUp" &&
                inputFocus &&
                playerTwo &&
                !playerDisabled
            ) {
                setActiveAvatar(avatars[0].id)
                setInputFocus(false)
                inputRef.current.blur()
            } else if (e.key === "ArrowUp" && inputFocus && singlePlayer) {
                setActiveAvatar(avatars[0].id)
                setInputFocus(false)
                inputRef.current.blur()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [inputFocus, playerOne, playerTwo, playerDisabled, singlePlayer])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                e.key === "Enter" &&
                inputFocus &&
                playerOne &&
                !playerDisabled
            ) {
                setInputError("Please enter a name")
            } else if (
                e.key === "Enter" &&
                inputFocus &&
                playerTwo &&
                !playerDisabled
            ) {
                setInputError("Please enter a name")
            } else if (e.key === "Enter" && inputFocus && singlePlayer) {
                setInputError("Please enter a name")
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [inputFocus, playerOne, playerTwo, playerDisabled, singlePlayer])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                e.key === "Enter" &&
                inputFocus &&
                inputValue &&
                selectedAvatar &&
                playerOne &&
                !playerDisabled
            ) {
                setInputError("")
                setAvatarError("")
                setPlayerOneReady()
                localStorage.setItem(
                    "PLAYER_ONE_AVATAR_KEY",
                    JSON.stringify(selectedAvatar)
                )
                localStorage.setItem(
                    "PLAYER_ONE_NAME_KEY",
                    JSON.stringify(inputValue)
                )
            } else if (
                e.key === "Enter" &&
                inputFocus &&
                inputValue &&
                selectedAvatar &&
                playerTwo &&
                !playerDisabled
            ) {
                setInputError("")
                setAvatarError("")
                setPlayerTwoReady()
                localStorage.setItem(
                    "PLAYER_TWO_AVATAR_KEY",
                    JSON.stringify(selectedAvatar)
                )
                localStorage.setItem(
                    "PLAYER_TWO_NAME_KEY",
                    JSON.stringify(inputValue)
                )
            } else if (
                e.key === "Enter" &&
                inputFocus &&
                inputValue &&
                selectedAvatar &&
                singlePlayer
            ) {
                setInputError("")
                setAvatarError("")
                localStorage.setItem(
                    "AVATAR_KEY",
                    JSON.stringify(selectedAvatar)
                )
                navigate(`/SinglePlayer/Categories?name=${inputValue}`)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [
        inputFocus,
        inputValue,
        selectedAvatar,
        playerOne,
        playerTwo,
        playerDisabled,
        singlePlayer,
        navigate,
    ])

    return (
        <>
            <div className={playerDisabled ? "disable" : ""}>
                <p className="title">Choose your avatar</p>

                <div className="avatarGallery">
                    {avatars.map((avatar) => (
                        <Avatar
                            key={avatar.id}
                            src={avatar.src}
                            alt={avatar.alt}
                            playerDisabled={playerDisabled}
                            onMouseEnter={
                                playerDisabled
                                    ? undefined
                                    : () => handleMouseEnter(avatar.id)
                            }
                            onClick={
                                playerDisabled
                                    ? undefined
                                    : () => handleAvatarClick(avatar)
                            }
                            activeAvatar={
                                playerDisabled
                                    ? undefined
                                    : activeAvatar === avatar.id
                            }
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
                        onChange={
                            playerDisabled ? undefined : handleInputChange
                        }
                        ref={inputRef}
                        readOnly={playerDisabled}
                    />
                </div>

                <p style={{ color: "red" }} className="title">
                    {inputError}
                </p>

                <div
                    className="buttonContainer"
                    onClick={selectedAvatar && inputValue ? onClick : undefined}
                >
                    <Button
                        text="Ready"
                        playerDisabled={playerDisabled}
                        onClick={
                            playerDisabled
                                ? undefined
                                : singlePlayer
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
