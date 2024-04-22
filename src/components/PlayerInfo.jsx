import "/src/App.css"
import Avatar from "/src/components/Avatar"
import Button from "/src/components/Button"
import Modal from "./Modal"
import noSound from "/src/assets/noSound.png"
import sound from "/src/assets/sound.png"
import sun from "/src/assets/sun.png"
import moon from "/src/assets/moon.png"
import buttonClick from "/src/assets/buttonHover.flac"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { avatars } from "/src/data/const.js"
import { Howl } from "howler"

const PlayerInfo = ({
    singlePlayer,
    playerOne,
    playerTwo,
    onClick,
    playerDisabled,
    setPlayerOneReady,
    setPlayerTwoReady,
    text,
}) => {
    const [activeAvatar, setActiveAvatar] = useState(0)
    const [selectedAvatar, setSelectedAvatar] = useState(null)
    const [avatarError, setAvatarError] = useState("")
    const [inputFocus, setInputFocus] = useState(false)
    const [inputError, setInputError] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [isDarkMode, setIsDarkMode] = useState(getInitialMode())
    const [showAboutMeModal, setShowAboutMeModal] = useState(false)
    const [soundOn, setSoundOn] = useState(true)

    useEffect(() => {
        // Update the body class when darkMode changes
        if (isDarkMode) {
            document.body.classList.add("dark-mode")
        } else {
            document.body.classList.remove("dark-mode")
        }
    }, [isDarkMode])

    useEffect(() => {
        localStorage.setItem("dark", JSON.stringify(isDarkMode))
    }, [isDarkMode])

    function getInitialMode() {
        const savedMode = JSON.parse(localStorage.getItem("dark"))
        return (
            savedMode ||
            window.matchMedia("(prefers-color-scheme: dark)").matches
        )
    }

    const buttonClickSound = new Howl({
        src: buttonClick,
    })

    useEffect(() => {
        const savedSoundSetting = localStorage.getItem("SOUND_EFFECT_KEY")
        if (savedSoundSetting !== null) {
            setSoundOn(JSON.parse(savedSoundSetting))
        }
    }, [])

    const toggleSound = () => {
        setSoundOn(!soundOn)
        // Persist the state to localStorage
        localStorage.setItem("SOUND_EFFECT_KEY", JSON.stringify(!soundOn))
    }

    const playSoundEffect = () => {
        if (soundOn) {
            buttonClickSound.play()
        }
    }

    function toggleDarkMode() {
        playSoundEffect()
        setIsDarkMode((prevMode) => !prevMode)
    }

    const navigate = useNavigate()

    const inputRef = useRef(null)

    const handleClickAboutMe = () => {
        playSoundEffect()
        setShowAboutMeModal(true)
    }

    const handleMouseEnter = (avatarId) => {
        setActiveAvatar(avatarId)
    }

    const handleAvatarClick = (avatar) => {
        playSoundEffect()
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
        playSoundEffect()
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
            localStorage.setItem(
                "SINGLE_PLAYER_NAME_KEY",
                JSON.stringify(inputValue)
            )
            navigate("/SinglePlayer/Categories")
        }
    }

    const handleClickPlayerOne = (e) => {
        playSoundEffect()
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
        playSoundEffect()
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
                playSoundEffect()
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
                playSoundEffect()
            } else if (e.key === "ArrowRight" && !inputFocus && singlePlayer) {
                const currentIndex = avatars.findIndex(
                    (avatar) => avatar.id === activeAvatar
                )
                const newIndex = currentIndex + 1

                if (newIndex < avatars.length) {
                    setActiveAvatar(avatars[newIndex].id)
                }
                playSoundEffect()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [
        activeAvatar,
        playerOne,
        playerTwo,
        playerDisabled,
        singlePlayer,
        soundOn,
    ])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowLeft" && playerOne && !playerDisabled) {
                const currentIndex = avatars.findIndex(
                    (avatar) => avatar.id === activeAvatar
                )
                const newIndex = currentIndex - 1
                setActiveAvatar(avatars[newIndex].id)
                playSoundEffect()
            } else if (e.key === "ArrowLeft" && playerTwo && !playerDisabled) {
                const currentIndex = avatars.findIndex(
                    (avatar) => avatar.id === activeAvatar
                )
                const newIndex = currentIndex - 1
                setActiveAvatar(avatars[newIndex].id)
                playSoundEffect()
            } else if (e.key === "ArrowLeft" && singlePlayer) {
                const currentIndex = avatars.findIndex(
                    (avatar) => avatar.id === activeAvatar
                )
                const newIndex = currentIndex - 1
                setActiveAvatar(avatars[newIndex].id)
                playSoundEffect()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [
        activeAvatar,
        playerOne,
        playerTwo,
        playerDisabled,
        singlePlayer,
        soundOn,
    ])

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
                playSoundEffect()
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
                playSoundEffect()
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
                playSoundEffect()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [
        activeAvatar,
        playerOne,
        playerTwo,
        playerDisabled,
        singlePlayer,
        soundOn,
    ])

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
                playSoundEffect()
            } else if (
                e.key === "ArrowDown" &&
                selectedAvatar &&
                playerTwo &&
                !playerDisabled
            ) {
                inputRef.current.focus()
                setActiveAvatar("")
                setInputFocus(true)
                playSoundEffect()
            } else if (
                e.key === "ArrowDown" &&
                selectedAvatar &&
                singlePlayer
            ) {
                inputRef.current.focus()
                setActiveAvatar("")
                setInputFocus(true)
                playSoundEffect()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [
        selectedAvatar,
        playerOne,
        playerTwo,
        playerDisabled,
        singlePlayer,
        soundOn,
    ])

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
    }, [
        inputFocus,
        playerOne,
        playerTwo,
        playerDisabled,
        singlePlayer,
        soundOn,
    ])

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
                playSoundEffect()
            } else if (
                e.key === "ArrowUp" &&
                inputFocus &&
                playerTwo &&
                !playerDisabled
            ) {
                setActiveAvatar(avatars[0].id)
                setInputFocus(false)
                inputRef.current.blur()
                playSoundEffect()
            } else if (e.key === "ArrowUp" && inputFocus && singlePlayer) {
                setActiveAvatar(avatars[0].id)
                setInputFocus(false)
                inputRef.current.blur()
                playSoundEffect()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [
        inputFocus,
        playerOne,
        playerTwo,
        playerDisabled,
        singlePlayer,
        soundOn,
    ])

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
                playSoundEffect()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [
        inputFocus,
        playerOne,
        playerTwo,
        playerDisabled,
        singlePlayer,
        soundOn,
    ])

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
                playSoundEffect()
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
                playSoundEffect()
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
                localStorage.setItem(
                    "SINGLE_PLAYER_NAME_KEY",
                    JSON.stringify(inputValue)
                )
                navigate("/SinglePlayer/Categories")
                playSoundEffect()
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
        soundOn,
    ])

    return (
        <>
            <div
                className={
                    playerDisabled ? "disable" : singlePlayer ? "infoMain" : ""
                }
            >
                <div className={singlePlayer ? "leftHalf" : ""}>
                    <p className={singlePlayer ? "title" : "titleTwoPlayer"}>
                        Choose avatar
                    </p>

                    <div
                        className={
                            singlePlayer
                                ? "avatarGallery"
                                : "avatarGalleryTwoPlayer"
                        }
                    >
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
                                singlePlayer={singlePlayer}
                                playerOne={playerOne}
                                playerTwo={playerTwo}
                            />
                        ))}
                    </div>

                    <div
                        className={
                            singlePlayer
                                ? "selectedAvatarContainer"
                                : playerOne
                                ? "selectedAvatarContainerTwoPlayer"
                                : playerTwo
                                ? "selectedAvatarContainerTwoPlayer"
                                : ""
                        }
                    >
                        {selectedAvatar && (
                            <div
                                className={
                                    singlePlayer
                                        ? "selectedAvatarContainer"
                                        : playerOne
                                        ? "selectedAvatarContainerTwoPlayer"
                                        : playerTwo
                                        ? "selectedAvatarContainerTwoPlayer"
                                        : ""
                                }
                            >
                                <div
                                    className={
                                        singlePlayer
                                            ? "selectedAvatarWrapper"
                                            : playerOne
                                            ? "selectedAvatarWrapperTwoPlayer"
                                            : playerTwo
                                            ? "selectedAvatarWrapperTwoPlayer"
                                            : ""
                                    }
                                >
                                    <img
                                        className={
                                            singlePlayer
                                                ? "selectedAvatar"
                                                : playerOne
                                                ? "selectedAvatarTwoPlayer"
                                                : playerTwo
                                                ? "selectedAvatarTwoPlayer"
                                                : ""
                                        }
                                        src={selectedAvatar.src}
                                        alt={selectedAvatar.alt}
                                    />
                                </div>
                                <div className="avatarInfo">
                                    <p className="avatarName">
                                        {selectedAvatar.name}
                                    </p>
                                    <p
                                        className={
                                            singlePlayer
                                                ? "avatarTrait"
                                                : "avatarTraitTwoPlayer"
                                        }
                                    >
                                        {selectedAvatar.trait}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <p className="errorMessage">{avatarError}</p>
                </div>

                <div className={singlePlayer ? "rightHalf" : ""}>
                    <p
                        className={
                            singlePlayer
                                ? "title"
                                : playerOne
                                ? "titleTwoPlayer"
                                : playerTwo
                                ? "titleTwoPlayer"
                                : ""
                        }
                    >
                        Enter name
                    </p>

                    <div className="inputContainer">
                        <input
                            type="text"
                            onChange={
                                playerDisabled ? undefined : handleInputChange
                            }
                            ref={inputRef}
                            readOnly={playerDisabled}
                            className={
                                inputFocus && singlePlayer
                                    ? "inputFocus"
                                    : inputFocus && playerOne
                                    ? "inputFocusTwoPlayer"
                                    : inputFocus && playerTwo
                                    ? "inputFocusTwoPlayer"
                                    : singlePlayer
                                    ? "input"
                                    : playerOne
                                    ? "inputTwoPlayer"
                                    : playerTwo
                                    ? "inputTwoPlayer"
                                    : ""
                            }
                        />
                    </div>

                    <p className="errorMessage">{inputError}</p>
                </div>
            </div>
            <div
                className={
                    singlePlayer
                        ? "buttonContainer"
                        : "buttonContainerTwoPlayer"
                }
                onClick={selectedAvatar && inputValue ? onClick : undefined}
            >
                <Button
                    text={singlePlayer ? "Ready" : text}
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
            {singlePlayer && (
                <div className="footerHome" style={{ marginTop: "50px" }}>
                    <div className="imgWrapper">
                        <img
                            src={soundOn ? sound : noSound}
                            alt="sound ON/OFF"
                            className="innerImg"
                            onClick={toggleSound}
                        />
                    </div>
                    <button
                        className="aboutMeButton"
                        onClick={handleClickAboutMe}
                    >
                        CLICK ME!
                    </button>

                    <div className="imgWrapper">
                        <img
                            src={isDarkMode ? sun : moon}
                            alt="dark mode"
                            className="innerImg"
                            onClick={toggleDarkMode}
                        />
                    </div>
                </div>
            )}
            {showAboutMeModal && singlePlayer && (
                <div>
                    <Modal
                        aboutMe={true}
                        handleCancelAllModals={() => setShowAboutMeModal(false)}
                        isDarkMode={isDarkMode}
                    />
                </div>
            )}
        </>
    )
}

export default PlayerInfo
