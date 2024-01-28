import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"
import Keyboard from "../../components/Keyboard.jsx"
import PlayerAvatar from "/src/components/PlayerAvatar"
import WordPuzzle from "../../components/WordPuzzle.jsx"
import WrongGuess from "../../components/WrongGuess.jsx"
//import FetchStatusMessage from "../../components/FetchStatusMessage.jsx"
//import WinModal from "../../components/WinModal.jsx"
//import LoseModal from "../../components/LoseModal.jsx"
//import LeaveGameModal from "/src/components/LeaveGameModal"
import HighScore from "../../components/HighScore.jsx"
import styles from "/src/stylesheets/SinglePlayerGamePlay.module.css"

const SinglePlayerGamePlay = () => {
    const navigate = useNavigate()

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const playerName = params.get("name")

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [puzzle, setPuzzle] = useState("")
    const [guessedLetters, setGuessedLetters] = useState([])
    const [selectedAvatar, setSelectedAvatar] = useState("")
    const [playerWins, setPlayerWins] = useState(false)
    const [pointsWon, setPointsWon] = useState(0)
    const [showWinModal, setShowWinModal] = useState(false)
    const [showLeaveGameModal, setShowLeaveGameModal] = useState(false)
    const [showLoseModal, setShowLoseModal] = useState(false)
    const [currentScore, setCurrentScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [isActive, setIsActive] = useState("")
    const [isNextPuzzleClicked, setIsNextPuzzleClicked] = useState(false)
    const [isHomePageButtonClicked, setIsHomePageButtonClicked] =
        useState(false)

    const modalStyles = {
        position: "fixed",
        height: "200px",
        width: "200px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
    }

    const overlayStyles = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                (e.key === "Enter" && isNextPuzzleClicked) ||
                isHomePageButtonClicked
            )
                e.preventDefault()
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isNextPuzzleClicked, isHomePageButtonClicked])

    useEffect(() => {
        const data = window.localStorage.getItem("AVATAR_KEY")
        setSelectedAvatar(JSON.parse(data))
    }, [])

    const fetchPuzzle = async () => {
        setError(null)

        const endpoint = `https://api.themoviedb.org/3/list/8286021-movies?api_key=277f68e7e4a806dcf0eea77c75c6391f&language=en-US`

        try {
            const response = await fetch(endpoint)
            if (!response.ok) {
                throw new Error("Failed to fetch movie data.")
            }
            const data = await response.json()
            const randomPuzzleIndex = Math.floor(
                Math.random() * data.items.length
            )
            const randomPuzzle = data.items[randomPuzzleIndex]?.title || ""
            const uppercasePuzzle = randomPuzzle.toUpperCase()
            setPuzzle(uppercasePuzzle)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPuzzle()
    }, [])

    const activeLetters = guessedLetters.filter((letter) =>
        puzzle.includes(letter)
    )

    const incorrectLetters = guessedLetters.filter(
        (letter) => !puzzle.includes(letter)
    )

    const isLoser = incorrectLetters.length >= 6
    const isWinner = puzzle
        .split("")
        .filter((letter) => ![":", "'", " "].includes(letter))
        .every((filteredLetter) => guessedLetters.includes(filteredLetter))

    useEffect(() => {
        if (isWinner) {
            setShowWinModal(true)
            setPlayerWins(true)
        }
    }, [isWinner])

    useEffect(() => {
        if (isWinner && playerWins) {
            const numberOfPointsWon = 6 - incorrectLetters.length
            setPointsWon(numberOfPointsWon)
        }
    }, [incorrectLetters.length, playerWins, isWinner])

    useEffect(() => {
        setCurrentScore((prevScore) => prevScore + pointsWon)
        console.log(currentScore)
    }, [pointsWon])

    useEffect(() => {
        const prevHighScore = JSON.parse(localStorage.getItem("HIGH_SCORE_KEY"))
        setHighScore(prevHighScore)
    }, [])

    useEffect(() => {
        const prevHighScore = JSON.parse(localStorage.getItem("HIGH_SCORE_KEY"))

        if (currentScore <= prevHighScore) {
            localStorage.setItem(
                "HIGH_SCORE_KEY",
                JSON.stringify(prevHighScore)
            )
            setHighScore(prevHighScore)
        } else if (currentScore > prevHighScore) {
            localStorage.setItem("HIGH_SCORE_KEY", JSON.stringify(currentScore))
            setHighScore(currentScore)
            alert("New Record!")
        }
    }, [currentScore])

    useEffect(() => {
        if (isLoser) {
            setPointsWon(0)
            setCurrentScore(0)
            setShowLoseModal(true)
        }
    }, [isLoser])

    const addGuessedLetter = useCallback(
        (letter) => {
            if (!guessedLetters.includes(letter) && !isWinner && !isLoser) {
                setGuessedLetters((currentLetters) => [
                    ...currentLetters,
                    letter,
                ])
            }
        },
        [guessedLetters, isWinner, isLoser]
    )

    useEffect(() => {
        const handleKeyDown = (e) => {
            const keyPressed = e.key.toUpperCase()

            if (/^[A-Z]$/.test(keyPressed) && !isWinner && !isLoser) {
                addGuessedLetter(keyPressed)
            }
        }

        window.addEventListener("keypress", handleKeyDown)

        return () => {
            window.removeEventListener("keypress", handleKeyDown)
        }
    }, [isWinner, isLoser, addGuessedLetter])

    const handleWinThenContinue = () => {
        setGuessedLetters([])
        setPuzzle("")
        setIsLoading(true)
        handleCancelAllModals()
        setPointsWon(0)
        fetchPuzzle()
    }

    const handleQuit = () => {
        setShowLeaveGameModal(true)
        setShowWinModal(false)
        setShowLoseModal(false)
    }

    const handleLoseThenContinue = () => {
        setGuessedLetters([])
        setPuzzle("")
        setIsLoading(true)
        handleCancelAllModals()
        setPointsWon(0)
        setCurrentScore(0)
        fetchPuzzle()
    }

    const winModalbuttons = [
        {
            id: 0,
            text: "Continue",
            click: handleWinThenContinue,
        },
        {
            id: 1,
            text: "Quit",
            click: handleQuit,
        },
    ]

    const loseModalbuttons = [
        {
            id: 0,
            text: "Yes",
            click: handleLoseThenContinue,
        },
        {
            id: 1,
            text: "No",
            click: handleQuit,
        },
    ]

    const handleCancelAllModals = () => {
        setShowWinModal(false)
        setShowLeaveGameModal(false)
        setShowLoseModal(false)
    }

    const handleSaveAndLeaveGame = () => {
        setIsHomePageButtonClicked(true)
        const prevHighScore = JSON.parse(localStorage.getItem("HIGH_SCORE_KEY"))

        if (currentScore <= prevHighScore) {
            localStorage.setItem(
                "HIGH_SCORE_KEY",
                JSON.stringify(prevHighScore)
            )
            navigate("/")
        } else if (currentScore > prevHighScore) {
            localStorage.setItem("HIGH_SCORE_KEY", JSON.stringify(currentScore))
            navigate("/")
        }
    }

    const leaveGameModalbuttons = [
        {
            id: 0,
            text: "Yes",
            click: handleSaveAndLeaveGame,
        },
        {
            id: 1,
            text: "No",
            click: handleCancelAllModals,
        },
    ]

    const handleNextPuzzle = () => {
        setGuessedLetters([])
        setPuzzle("")
        setIsLoading(true)
        setPointsWon(0)
        fetchPuzzle()
        setIsNextPuzzleClicked(true)
    }

    const handleMouseEnter = (buttonId) => {
        setIsActive(buttonId)
    }

    const handleMouseLeave = () => {}

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (showWinModal && !showLoseModal && !showLeaveGameModal) {
                setIsActive(winModalbuttons[0].id)
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    const currentIndex = winModalbuttons.findIndex(
                        (button) => button.id === isActive
                    )
                    let nextIndex

                    if (e.key === "ArrowRight") {
                        nextIndex =
                            currentIndex < winModalbuttons.length - 1
                                ? currentIndex + 1
                                : currentIndex
                    } else if (e.key === "ArrowLeft") {
                        nextIndex = currentIndex > 0 ? currentIndex - 1 : 0
                    }

                    setIsActive(winModalbuttons[nextIndex].id)
                } else if (e.key === "Enter") {
                    e.preventDefault()
                    const currentIndex = winModalbuttons.findIndex(
                        (button) => button.id === isActive
                    )
                    winModalbuttons[currentIndex].click()
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [showWinModal, showLoseModal, showLeaveGameModal, winModalbuttons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (showLoseModal && !showWinModal && !showLeaveGameModal) {
                setIsActive(loseModalbuttons[0].id)
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    const currentIndex = loseModalbuttons.findIndex(
                        (button) => button.id === isActive
                    )
                    let nextIndex

                    if (e.key === "ArrowRight") {
                        nextIndex =
                            currentIndex < loseModalbuttons.length - 1
                                ? currentIndex + 1
                                : currentIndex
                    } else if (e.key === "ArrowLeft") {
                        nextIndex = currentIndex > 0 ? currentIndex - 1 : 0
                    }

                    setIsActive(loseModalbuttons[nextIndex].id)
                } else if (e.key === "Enter") {
                    e.preventDefault()
                    const currentIndex = loseModalbuttons.findIndex(
                        (button) => button.id === isActive
                    )
                    loseModalbuttons[currentIndex].click()
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [showWinModal, showLoseModal, showLeaveGameModal, loseModalbuttons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!showLoseModal && !showWinModal && showLeaveGameModal) {
                setIsActive(leaveGameModalbuttons[0].id)
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    const currentIndex = leaveGameModalbuttons.findIndex(
                        (button) => button.id === isActive
                    )
                    let nextIndex

                    if (e.key === "ArrowRight") {
                        nextIndex =
                            currentIndex < leaveGameModalbuttons.length - 1
                                ? currentIndex + 1
                                : currentIndex
                    } else if (e.key === "ArrowLeft") {
                        nextIndex = currentIndex > 0 ? currentIndex - 1 : 0
                    }

                    setIsActive(leaveGameModalbuttons[nextIndex].id)
                } else if (e.key === "Enter") {
                    e.preventDefault()
                    const currentIndex = leaveGameModalbuttons.findIndex(
                        (button) => button.id === isActive
                    )
                    leaveGameModalbuttons[currentIndex].click()
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [showWinModal, showLoseModal, showLeaveGameModal, leaveGameModalbuttons])

    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.header}>
                    <h1>Single Player - Game play</h1>
                </div>
                <div className={styles.playerInfo}>
                    <div>
                        <PlayerAvatar selectedAvatar={selectedAvatar} />
                    </div>
                    <div>
                        <p>Player Name: {playerName}</p>
                    </div>
                </div>
                <div style={{ paddingBottom: "10px" }}>
                    <WrongGuess numberOfGuesses={incorrectLetters.length} />
                </div>
                <div className={styles.puzzleContainer}>
                    <WordPuzzle
                        puzzle={puzzle}
                        guessedLetters={guessedLetters}
                        reveal={isLoser}
                    />
                </div>
                <div>
                    <FetchStatusMessage isLoading={isLoading} error={error} />
                </div>
                <div style={{ paddingTop: "10px" }}>
                    <Keyboard
                        activeLetters={activeLetters}
                        inactiveLetters={incorrectLetters}
                        onLetterClick={addGuessedLetter}
                        disabled={isWinner || isLoser}
                    />
                </div>
                <div className={styles.currentScore}>
                    <p>Current Score: {currentScore}</p>
                </div>
                <div>
                    <HighScore highScore={highScore} />
                </div>
                <div className={styles.footer}>
                    <button onClick={handleQuit}>Back to home page</button>
                    <button onClick={handleNextPuzzle}>Next Puzzle</button>
                </div>
                <div>
                    {isWinner && showWinModal && (
                        <div>
                            <div
                                style={overlayStyles}
                                onClick={handleCancelAllModals}
                                className={showWinModal ? styles.overlay : ""}
                            ></div>
                            <div
                                style={modalStyles}
                                className={showWinModal ? styles.modal : ""}
                            >
                                <p>Congrats! You won {pointsWon} points!</p>
                                <p>Your current score is {currentScore}</p>
                                <p>Next puzzle?</p>

                                <div className={styles.buttonsContainer}>
                                    {winModalbuttons.map((button) => (
                                        <button
                                            key={button.id}
                                            onMouseEnter={() =>
                                                handleMouseEnter(button.id)
                                            }
                                            onMouseLeave={handleMouseLeave}
                                            onClick={button.click}
                                            className={
                                                button.id === isActive
                                                    ? styles.activeButton
                                                    : ""
                                            }
                                        >
                                            {button.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    {isLoser && showLoseModal && (
                        <div>
                            <div
                                style={overlayStyles}
                                onClick={handleCancelAllModals}
                                className={showLoseModal ? styles.overlay : ""}
                            ></div>
                            <div
                                style={modalStyles}
                                className={showLoseModal ? styles.modal : ""}
                            >
                                <p>Nice Try! Play Again?</p>

                                <div className={styles.buttonsContainer}>
                                    {loseModalbuttons.map((button) => (
                                        <button
                                            key={button.id}
                                            onMouseEnter={() =>
                                                handleMouseEnter(button.id)
                                            }
                                            onMouseLeave={handleMouseLeave}
                                            onClick={button.click}
                                            className={
                                                button.id === isActive
                                                    ? styles.activeButton
                                                    : ""
                                            }
                                        >
                                            {button.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    {showLeaveGameModal && (
                        <div>
                            <div
                                style={overlayStyles}
                                onClick={handleCancelAllModals}
                                className={
                                    showLeaveGameModal ? styles.overlay : ""
                                }
                            ></div>
                            <div
                                style={modalStyles}
                                className={
                                    showLeaveGameModal ? styles.modal : ""
                                }
                            >
                                <p>Leave game and return to home page?</p>

                                <div className={styles.buttonsContainer}>
                                    {leaveGameModalbuttons.map((button) => (
                                        <button
                                            key={button.id}
                                            onMouseEnter={() =>
                                                handleMouseEnter(button.id)
                                            }
                                            onMouseLeave={handleMouseLeave}
                                            onClick={button.click}
                                            className={
                                                button.id === isActive
                                                    ? styles.activeButton
                                                    : ""
                                            }
                                        >
                                            {button.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default SinglePlayerGamePlay
