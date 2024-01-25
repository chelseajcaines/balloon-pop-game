import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import styles from "/src/stylesheets/TwoPlayerSetup.module.css"

const TwoPlayerSetup = () => {
    const [activeAvatar, setActiveAvatar] = useState("")
    const [selectedAvatar, setSelectedAvatar] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [inputError, setInputError] = useState("")
    const [avatarError, setAvatarError] = useState("")
    const [inputFocus, setInputFocus] = useState(false)

    const avatars = [
        {
            id: 0,
            src: "/src/assets/cat.png",
            alt: "Cat",
        },
        {
            id: 1,
            src: "/src/assets/dog.png",
            alt: "Dog",
        },
        {
            id: 2,
            src: "/src/assets/fox.png",
            alt: "Fox",
        },
        {
            id: 3,
            src: "/src/assets/duck.png",
            alt: "Duck",
        },
        {
            id: 4,
            src: "/src/assets/sloth.png",
            alt: "Sloth",
        },
    ]

    const navigate = useNavigate()

    const inputRef = useRef(null)

    const handleInputChange = (e) => {
        setInputError("")
        setInputValue(e.target.value)
    }

    const handleMouseEnter = (avatarId) => {
        setActiveAvatar(avatarId)
    }

    const handleAvatarClick = (avatar) => {
        setSelectedAvatar(avatar)
        setAvatarError("")
        inputRef.current.focus()
    }

    const handleNextPageClick = (e) => {
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

    useEffect(() => {
        const firstAvatar = avatars[0]
        setActiveAvatar(firstAvatar.id)
    }, [])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight") {
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
    }, [activeAvatar, avatars])

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
    }, [activeAvatar, avatars])

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

    return (
        <>
            <h1>Two Player Setup</h1>
            <div className={styles.mainContainer}>
                <div className={styles.playerOneContainer}>
                    <p>Player 1</p>

                    {avatars.map((avatar) => (
                        <img
                            key={avatar.id}
                            src={avatar.src}
                            alt={avatar.alt}
                            onMouseEnter={() => handleMouseEnter(avatar.id)}
                            onClick={() => handleAvatarClick(avatar)}
                            className={
                                avatar.id === activeAvatar
                                    ? styles.activeAvatar
                                    : styles.avatar
                            }
                        />
                    ))}

                    {selectedAvatar && (
                        <img
                            className={styles.selectedAvatar}
                            src={selectedAvatar.src}
                            alt={selectedAvatar.alt}
                        />
                    )}

                    <p style={{ color: "red" }}>{avatarError}</p>

                    <p>Enter name</p>

                    <input
                        type="text"
                        onChange={handleInputChange}
                        ref={inputRef}
                    />

                    <p style={{ color: "red" }}>{inputError}</p>

                    <button
                        onClick={handleNextPageClick}
                        className={
                            inputValue && selectedAvatar
                                ? styles.activeButton
                                : ""
                        }
                    >
                        Next
                    </button>
                </div>
                <div className={styles.playerTwoContainer}>
                    <p>Player 2</p>

                    {avatars.map((avatar) => (
                        <img
                            key={avatar.id}
                            src={avatar.src}
                            alt={avatar.alt}
                            onMouseEnter={() => handleMouseEnter(avatar.id)}
                            onClick={() => handleAvatarClick(avatar)}
                            className={
                                avatar.id === activeAvatar
                                    ? styles.activeAvatar
                                    : styles.avatar
                            }
                        />
                    ))}

                    {selectedAvatar && (
                        <img
                            className={styles.selectedAvatar}
                            src={selectedAvatar.src}
                            alt={selectedAvatar.alt}
                        />
                    )}

                    <p style={{ color: "red" }}>{avatarError}</p>

                    <p>Enter name</p>

                    <input
                        type="text"
                        onChange={handleInputChange}
                        ref={inputRef}
                    />

                    <p style={{ color: "red" }}>{inputError}</p>

                    <button
                        onClick={handleNextPageClick}
                        className={
                            inputValue && selectedAvatar
                                ? styles.activeButton
                                : ""
                        }
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default TwoPlayerSetup
