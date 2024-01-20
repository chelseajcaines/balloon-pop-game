import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import styles from "/src/stylesheets/SinglePlayerSetup.module.css"

const SignlePlayerSetup = () => {
    const [activeAvatar, setActiveAvatar] = useState(0)
    const [selectedAvatar, setSelectedAvatar] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [inputError, setInputError] = useState("")
    const [isButtonActive, setIsButtonActive] = useState(false)
    const [greyOutAvatars, setGreyOutAvatars] = useState(false)
    const [avatarNavigationEnabled, setAvatarNavigationEnabled] = useState(true)

    const navigate = useNavigate()

    const inputRef = useRef(null)

    const handleInputChange = (e) => {
        setIsButtonActive(true)
        setInputValue(e.target.value)
    }

    const handleInputClick = () => {
        if (selectedAvatar) {
            setActiveAvatar("")
            setGreyOutAvatars(true)
        }
    }

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

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowDown" && selectedAvatar) {
                inputRef.current.focus()
                setGreyOutAvatars(true)
                setActiveAvatar("")
                setAvatarNavigationEnabled(false)
            } else if (!avatarNavigationEnabled && e.key === "ArrowUp") {
                inputRef.current.blur()
                setAvatarNavigationEnabled(true)
                setGreyOutAvatars(false)
                setActiveAvatar(avatars[0].id)
            } else if (avatarNavigationEnabled) {
                handleAvatarNavigation(e)
            } else if (!avatarNavigationEnabled) {
                handleNextPageEnterKey(e)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [
        avatars,
        activeAvatar,
        selectedAvatar,
        inputRef,
        greyOutAvatars,
        avatarNavigationEnabled,
        inputValue,
        inputError,
        navigate,
    ])

    const handleAvatarNavigation = (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            const currentIndex = avatars.findIndex(
                (avatar) => avatar.id === activeAvatar
            )
            let nextIndex

            if (e.key === "ArrowRight") {
                nextIndex =
                    currentIndex < avatars.length - 1
                        ? currentIndex + 1
                        : currentIndex
            } else if (e.key === "ArrowLeft") {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : 0
            }

            setActiveAvatar(avatars[nextIndex].id)
        } else if (e.key === "Enter" && activeAvatar) {
            setSelectedAvatar(avatars[activeAvatar])
        }
    }

    const handleMouseEnter = (avatar) => {
        setActiveAvatar(avatar)
        setGreyOutAvatars(false)
        inputRef.current.blur()
    }

    const handleMouseLeave = () => {}

    const handleAvatarClick = (avatar) => {
        setSelectedAvatar(avatar)
    }

    const getRandomAvatar = () => {
        const randomIndex = Math.floor(Math.random() * avatars.length)
        return avatars[randomIndex]
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
            navigate(`/SinglePlayer/Categories?name=${inputValue}`)
        } else if (selectedAvatar && inputValue) {
            setInputError("")
            localStorage.setItem("AVATAR_KEY", JSON.stringify(selectedAvatar))
            navigate(`/SinglePlayer/Categories?name=${inputValue}`)
        }
    }

    const handleNextPageEnterKey = (e) => {
        if (selectedAvatar && !inputValue && e.key === "Enter") {
            setInputError("Please enter a name")
        } else if (selectedAvatar && inputValue && e.key === "Enter") {
            setInputError("")
            localStorage.setItem("AVATAR_KEY", JSON.stringify(selectedAvatar))
            navigate(`/SinglePlayer/Categories?name=${inputValue}`)
        }
    }

    return (
        <>
            <h1>Single Player Setup</h1>
            <p>Choose your avatar</p>

            {avatars.map((avatar) => (
                <img
                    key={avatar.id}
                    src={avatar.src}
                    alt={avatar.alt}
                    onClick={() => handleAvatarClick(avatar)}
                    onMouseEnter={() => handleMouseEnter(avatar.id)}
                    onMouseLeave={handleMouseLeave}
                    className={
                        avatar.id === activeAvatar
                            ? styles.activeAvatar
                            : greyOutAvatars
                            ? styles.greyAvatars
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

            <p>Enter name</p>

            <input
                type="text"
                onChange={handleInputChange}
                onClick={handleInputClick}
                ref={inputRef}
            />

            <p style={{ color: "red" }}>{inputError}</p>

            <button
                onClick={handleNextPageClick}
                className={isButtonActive ? styles.activeButton : ""}
            >
                Next
            </button>
        </>
    )
}

export default SignlePlayerSetup
