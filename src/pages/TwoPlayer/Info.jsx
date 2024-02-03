import styles from "/src/stylesheets/TwoPlayerSetup.module.css"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import checkmark from "/src/assets/checkmark.png"

const TwoPlayerSetup = () => {
    const [activeAvatarOne, setActiveAvatarOne] = useState(0)
    const [activeAvatarTwo, setActiveAvatarTwo] = useState(0)
    const [selectedAvatarOne, setSelectedAvatarOne] = useState("")
    const [selectedAvatarTwo, setSelectedAvatarTwo] = useState("")
    const [avatarErrorOne, setAvatarErrorOne] = useState("")
    const [avatarErrorTwo, setAvatarErrorTwo] = useState("")
    const [inputFocusOne, setInputFocusOne] = useState(false)
    const [inputFocusTwo, setInputFocusTwo] = useState(false)
    const [inputValueOne, setInputValueOne] = useState("")
    const [inputValueTwo, setInputValueTwo] = useState("")
    const [inputErrorOne, setInputErrorOne] = useState("")
    const [inputErrorTwo, setInputErrorTwo] = useState("")
    const [isPlayerOneActive, setIsPlayerOneActive] = useState(true)
    const [isPlayerTwoActive, setIsPlayerTwoActive] = useState(false)
    const [isPlayerOneReady, setIsPlayerOneReady] = useState("")
    const [isPlayerTwoReady, setIsPlayerTwoReady] = useState("")
    const [playerOneReadyButtonActive, setPlayerOneReadyButtonActive] =
        useState(false)
    const [playerTwoReadyButtonActive, setPlayerTwoReadyButtonActive] =
        useState(false)
    const [playerOneReadyButtonClicked, setPlayerOneReadyButtonClicked] =
        useState(false)
    const [playerTwoReadyButtonClicked, setPlayerTwoReadyButtonClicked] =
        useState(false)

    const playerOneAvatars = [
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

    const playerTwoAvatars = [
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

    /////////////////////////////////////////////////////////////////

    const navigate = useNavigate()

    const oneInputRef = useRef(null)
    const twoInputRef = useRef(null)

    const handleInputOneChange = (e) => {
        setInputErrorOne("")
        setInputValueOne(e.target.value)
    }

    const handleInputTwoChange = (e) => {
        setInputErrorTwo("")
        setInputValueTwo(e.target.value)
    }

    const handleMouseEnter = (avatarId) => {
        setActiveAvatarOne(avatarId)
    }

    const handleAvatarClickOne = (avatar) => {
        setSelectedAvatarOne(avatar)
        setAvatarErrorOne("")
        setInputFocusOne(true)
        oneInputRef.current.focus()
    }

    const handleAvatarClickTwo = (avatar) => {
        setSelectedAvatarTwo(avatar)
        setAvatarErrorTwo("")
        setInputFocusTwo(true)
        twoInputRef.current.focus()
    }

    const handleReadyClickOne = (e) => {
        e.preventDefault()
        if (!inputValueOne && !selectedAvatarOne) {
            setInputErrorOne("Please enter a name")
            setAvatarErrorOne("Please select avatar")
        } else if (!selectedAvatarOne && inputValueOne) {
            setAvatarErrorOne("Please select avatar")
            setInputErrorOne("")
        } else if (selectedAvatarOne && !inputValueOne) {
            setAvatarErrorOne("")
            setInputErrorOne("Please enter a name")
        } else {
            setInputErrorOne("")
            setAvatarErrorOne("")
            localStorage.setItem(
                "PLAYER_ONE_AVATAR_KEY",
                JSON.stringify(selectedAvatarOne)
            )
            setIsPlayerTwoActive(true)
            setActiveAvatarTwo(playerTwoAvatars[0].id)
            setIsPlayerOneReady(true)
            setIsPlayerOneActive(false)
            setPlayerOneReadyButtonClicked(true)
        }
    }

    const handleReadyClickTwo = (e) => {
        e.preventDefault()
        if (!inputValueTwo && !selectedAvatarTwo) {
            setInputErrorTwo("Please enter a name")
            setAvatarErrorTwo("Please select avatar")
        } else if (!selectedAvatarTwo && inputValueTwo) {
            setAvatarErrorTwo("Please select avatar")
            setInputErrorTwo("")
        } else if (selectedAvatarTwo && !inputValueTwo) {
            setAvatarErrorTwo("")
            setInputErrorTwo("Please enter a name")
        } else {
            setInputErrorTwo("")
            setAvatarErrorTwo("")
            localStorage.setItem(
                "PLAYER_TWO_AVATAR_KEY",
                JSON.stringify(selectedAvatarTwo)
            )
            setIsPlayerTwoActive(false)
            setIsPlayerTwoReady(true)
            setPlayerTwoReadyButtonClicked(true)
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter" && playerOneReadyButtonClicked)
                e.preventDefault()
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [playerOneReadyButtonClicked])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter" && playerTwoReadyButtonClicked)
                e.preventDefault()
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [playerTwoReadyButtonClicked])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isPlayerOneActive && e.key === "ArrowRight" && !inputFocusOne) {
                const currentIndex = playerOneAvatars.findIndex(
                    (avatar) => avatar.id === activeAvatarOne
                )
                const newIndex = currentIndex + 1
                if (newIndex < playerOneAvatars.length) {
                    setActiveAvatarOne(playerOneAvatars[newIndex].id)
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [activeAvatarOne, playerOneAvatars])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isPlayerOneActive && e.key === "ArrowLeft") {
                const currentIndex = playerOneAvatars.findIndex(
                    (avatar) => avatar.id === activeAvatarOne
                )
                const newIndex = currentIndex - 1
                setActiveAvatarOne(playerOneAvatars[newIndex].id)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [activeAvatarOne, playerOneAvatars])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                isPlayerOneActive &&
                e.key === "Enter" &&
                activeAvatarOne !== ""
            ) {
                const selected = playerOneAvatars.find(
                    (avatar) => avatar.id === activeAvatarOne
                )
                if (selected) {
                    setSelectedAvatarOne(selected)
                }
                setAvatarErrorOne("")
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [activeAvatarOne])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                isPlayerOneActive &&
                e.key === "ArrowDown" &&
                selectedAvatarOne
            ) {
                oneInputRef.current.focus()
                setActiveAvatarOne("")
                setInputFocusOne(true)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [selectedAvatarOne])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isPlayerOneActive && e.key === "ArrowRight" && inputFocusOne) {
                setActiveAvatarOne("")
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [inputFocusOne])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isPlayerOneActive && e.key === "ArrowLeft" && inputFocusOne) {
                setActiveAvatarOne("")
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [inputFocusOne])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                isPlayerOneActive &&
                e.key === "ArrowUp" &&
                inputFocusOne &&
                !playerOneReadyButtonActive
            ) {
                setActiveAvatarOne(playerOneAvatars[0].id)
                setInputFocusOne(false)
                oneInputRef.current.blur()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [inputFocusOne, playerOneAvatars, playerOneReadyButtonActive])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isPlayerOneActive && e.key === "Enter" && inputFocusOne) {
                setInputErrorOne("Please enter a name")
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [inputFocusOne])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                isPlayerOneActive &&
                e.key === "Enter" &&
                inputFocusOne &&
                inputValueOne
            ) {
                setInputErrorOne("")
                localStorage.setItem(
                    "PLAYER_ONE_AVATAR_KEY",
                    JSON.stringify(selectedAvatarOne)
                )
                setIsPlayerOneActive(false)
                setIsPlayerOneReady(true)
                setIsPlayerTwoActive(true)
                setPlayerOneReadyButtonClicked(true)
                setActiveAvatarOne("")
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [inputFocusOne, inputValueOne, selectedAvatarOne])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                isPlayerOneActive &&
                e.key === "ArrowDown" &&
                inputFocusOne &&
                inputValueOne
            ) {
                setInputErrorOne("")
                setPlayerOneReadyButtonActive(true)
                oneInputRef.current.blur()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [inputFocusOne, inputValueOne])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                isPlayerOneActive &&
                e.key === "Enter" &&
                playerOneReadyButtonActive
            ) {
                localStorage.setItem(
                    "PLAYER_ONE_AVATAR_KEY",
                    JSON.stringify(selectedAvatarOne)
                )
                setIsPlayerOneActive(false)
                setIsPlayerOneReady(true)
                setIsPlayerTwoActive(true)
                setPlayerOneReadyButtonClicked(true)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [playerOneReadyButtonActive, inputValueOne, selectedAvatarOne])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                isPlayerOneActive &&
                e.key === "ArrowUp" &&
                playerOneReadyButtonActive
            ) {
                oneInputRef.current.focus()
                setInputFocusOne(true)
                setPlayerOneReadyButtonActive(false)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [playerOneReadyButtonActive])

    ///////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isPlayerTwoActive && e.key === "ArrowRight" && !inputFocusTwo) {
                const currentIndex = playerTwoAvatars.findIndex(
                    (avatar) => avatar.id === activeAvatarTwo
                )
                const newIndex = currentIndex + 1
                if (newIndex < playerTwoAvatars.length) {
                    setActiveAvatarTwo(playerTwoAvatars[newIndex].id)
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [activeAvatarTwo, playerTwoAvatars])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isPlayerTwoActive && e.key === "ArrowLeft") {
                const currentIndex = playerTwoAvatars.findIndex(
                    (avatar) => avatar.id === activeAvatarTwo
                )
                const newIndex = currentIndex - 1
                setActiveAvatarTwo(playerTwoAvatars[newIndex].id)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [activeAvatarTwo, playerTwoAvatars])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                isPlayerTwoActive &&
                e.key === "Enter" &&
                activeAvatarTwo !== ""
            ) {
                const selected = playerTwoAvatars.find(
                    (avatar) => avatar.id === activeAvatarTwo
                )
                if (selected) {
                    setSelectedAvatarTwo(selected)
                }
                setAvatarErrorTwo("")
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [activeAvatarTwo])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                isPlayerTwoActive &&
                e.key === "ArrowDown" &&
                selectedAvatarTwo
            ) {
                twoInputRef.current.focus()
                setActiveAvatarTwo("")
                setInputFocusTwo(true)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [selectedAvatarTwo])

    return (
        <>
            <div className={styles.pageContainer}>
                <h1 className={styles.header}>Two Player Setup</h1>
                <div className={styles.playerContainers}>
                    <div
                        className={
                            isPlayerOneActive
                                ? styles.playerOneActive
                                : styles.playerOneContainer
                        }
                    >
                        <p className={styles.playerHeader}>Player 1</p>
                        <div className={styles.avatarGallery}>
                            {playerOneAvatars.map((avatar) => (
                                <img
                                    key={avatar.id}
                                    src={avatar.src}
                                    alt={avatar.alt}
                                    onClick={
                                        isPlayerOneActive
                                            ? () => handleAvatarClickOne(avatar)
                                            : undefined
                                    }
                                    onMouseEnter={
                                        isPlayerOneActive
                                            ? () => handleMouseEnter(avatar.id)
                                            : undefined
                                    }
                                    className={
                                        isPlayerOneActive &&
                                        avatar.id === activeAvatarOne
                                            ? styles.activeAvatar
                                            : styles.avatar
                                    }
                                />
                            ))}
                        </div>

                        <div>
                            {selectedAvatarOne && (
                                <img
                                    className={styles.selectedAvatar}
                                    src={selectedAvatarOne.src}
                                    alt={selectedAvatarOne.alt}
                                />
                            )}
                        </div>
                        <p style={{ color: "red" }}>{avatarErrorOne}</p>

                        <p>Enter name</p>
                        {isPlayerOneActive ? (
                            <input
                                type="text"
                                ref={oneInputRef}
                                onChange={
                                    isPlayerOneActive
                                        ? handleInputOneChange
                                        : undefined
                                }
                            />
                        ) : (
                            <input readOnly />
                        )}
                        <p style={{ color: "red" }}>{inputErrorOne}</p>
                        <button
                            className={
                                (inputValueOne &&
                                    selectedAvatarOne &&
                                    playerOneReadyButtonActive) ||
                                playerOneReadyButtonClicked
                                    ? styles.activePlayerButton
                                    : !playerOneReadyButtonActive &&
                                      inputValueOne &&
                                      selectedAvatarOne
                                    ? styles.activeButton
                                    : ""
                            }
                            onClick={
                                isPlayerOneActive
                                    ? handleReadyClickOne
                                    : undefined
                            }
                        >
                            Ready
                        </button>
                        <div>
                            {isPlayerOneReady && (
                                <img
                                    src={checkmark}
                                    alt={"checkmark"}
                                    className={styles.checkmarkOne}
                                />
                            )}
                        </div>
                    </div>

                    <div
                        className={
                            isPlayerTwoActive
                                ? styles.playerTwoActive
                                : styles.playerTwoContainer
                        }
                    >
                        <p className={styles.playerHeader}>Player 2</p>
                        <div className={styles.avatarGallery}>
                            {playerTwoAvatars.map((avatar) => (
                                <img
                                    key={avatar.id}
                                    src={avatar.src}
                                    alt={avatar.alt}
                                    onClick={
                                        isPlayerTwoActive
                                            ? () => handleAvatarClickTwo(avatar)
                                            : undefined
                                    }
                                    onMouseEnter={
                                        isPlayerTwoActive
                                            ? () => handleMouseEnter(avatar.id)
                                            : undefined
                                    }
                                    className={
                                        isPlayerTwoActive &&
                                        avatar.id === activeAvatarTwo
                                            ? styles.activeAvatar
                                            : styles.avatar
                                    }
                                />
                            ))}
                        </div>
                        <div>
                            {selectedAvatarTwo && (
                                <img
                                    className={styles.selectedAvatar}
                                    src={selectedAvatarTwo.src}
                                    alt={selectedAvatarTwo.alt}
                                />
                            )}
                        </div>
                        <p style={{ color: "red" }}>{avatarErrorTwo}</p>

                        <p>Enter name</p>
                        {isPlayerTwoActive ? (
                            <input
                                type="text"
                                ref={twoInputRef}
                                onChange={
                                    isPlayerTwoActive
                                        ? handleInputTwoChange
                                        : undefined
                                }
                            />
                        ) : (
                            <input readOnly />
                        )}
                        <p style={{ color: "red" }}>{inputErrorTwo}</p>
                        <button
                            className={
                                inputValueTwo &&
                                selectedAvatarTwo &&
                                playerTwoReadyButtonActive
                                    ? styles.activePlayerButton
                                    : !playerTwoReadyButtonActive &&
                                      inputValueTwo &&
                                      selectedAvatarTwo
                                    ? styles.activeButton
                                    : ""
                            }
                            onClick={
                                isPlayerTwoActive
                                    ? handleReadyClickTwo
                                    : undefined
                            }
                        >
                            Ready
                        </button>
                        <div>
                            {isPlayerTwoReady && (
                                <img
                                    src={checkmark}
                                    alt={"checkmark"}
                                    className={styles.checkmarkTwo}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <button
                    className={
                        isPlayerOneReady && isPlayerTwoReady
                            ? styles.activeStartButton
                            : styles.startButton
                    }
                    onClick={() =>
                        navigate(
                            `/TwoPlayer/Categories?PlayerOneName=${inputValueOne}&PlayerTwoName=${inputValueTwo}`
                        )
                    }
                >
                    Start
                </button>
            </div>
        </>
    )
}

export default TwoPlayerSetup
