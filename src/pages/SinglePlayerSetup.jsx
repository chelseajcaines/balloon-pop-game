import { useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { avatarArray } from "/src/data/const"
import styles from "/src/stylesheets/SinglePlayerSetup.module.css"

const SignlePlayerSetup = () => {
    const [inputValue, setInputValue] = useState("")
    const [inputError, setInputError] = useState("")
    const [selectedAvatar, setSelectedAvatar] = useState("")
    const [activeAvatar, setActiveAvatar] = useState("")
    const [isActive, setIsActive] = useState(false)

    const navigate = useNavigate()

    const getRandomAvatar = () => {
        const randomIndex = Math.floor(Math.random() * avatarArray.length)
        return avatarArray[randomIndex]
    }

    const inputRef = useRef(null)

    const handleInputChange = (e) => {
        setIsActive(true)
        setInputValue(e.target.value)
    }

    useEffect(() => {
        setActiveAvatar(avatarArray[0])
    }, [])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight") {
                const currentIndex = avatarArray.findIndex(
                    (avatar) => avatar === activeAvatar
                )
                const nextIndex =
                    currentIndex < avatarArray.length - 1
                        ? currentIndex + 1
                        : avatarArray.length - 1
                setActiveAvatar(avatarArray[nextIndex])
            } else if (e.key === "ArrowLeft") {
                const currentIndex = avatarArray.findIndex(
                    (avatar) => avatar === activeAvatar
                )
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : 0
                setActiveAvatar(avatarArray[prevIndex])
            } else if (activeAvatar && e.key === "Enter") {
                setSelectedAvatar(activeAvatar)
                localStorage.setItem("AVATAR_KEY", JSON.stringify(activeAvatar))
            } else if (selectedAvatar && e.key === "ArrowDown") {
                inputRef.current.focus()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [activeAvatar, selectedAvatar, inputRef])

    const handleNextPageEnterKey = (e) => {
        if (selectedAvatar && !inputValue && e.key === "Enter") {
            setInputError("Please enter a name")
        } else if (selectedAvatar && inputValue && e.key === "Enter") {
            setInputError("")
            navigate(`/Categories?name=${inputValue}`)
        }
    }

    const handleAvatarClick = (avatar) => {
        setActiveAvatar(avatar)
        setSelectedAvatar(activeAvatar)
        localStorage.setItem("AVATAR_KEY", JSON.stringify(activeAvatar))
    }

    const handleNextPageClick = (e) => {
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
            <div className={styles.pageContainer}>
                <div className={styles.header}>
                    <h1>Single Player Setup</h1>
                    <p>Choose your avatar</p>
                </div>
                <div className={styles.avatarGallery}>
                    {avatarArray.map((avatar) => (
                        <img
                            key={avatar.id}
                            src={avatar.src}
                            alt={avatar.alt}
                            style={{ cursor: "pointer", margin: "10px" }}
                            onClick={() => handleAvatarClick(avatar)}
                            className={
                                avatar === activeAvatar
                                    ? styles.activeAvatar
                                    : styles.avatar
                            }
                        />
                    ))}
                </div>

                <div>
                    {selectedAvatar && (
                        <img
                            className={styles.selectedAvatar}
                            src={selectedAvatar.src}
                            alt={selectedAvatar.alt}
                        />
                    )}
                </div>
                <div>
                    <p>Enter name</p>
                </div>
                <div>
                    <input
                        ref={inputRef}
                        type="text"
                        onChange={handleInputChange}
                        onKeyDown={handleNextPageEnterKey}
                    />
                </div>
                <div>
                    <p style={{ color: "red" }}>{inputError}</p>
                </div>
                <div>
                    <button
                        onClick={handleNextPageClick}
                        className={isActive ? styles.nextButton : ""}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default SignlePlayerSetup
