import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"
import Keyboard from "../../components/Keyboard.jsx"
import PlayerAvatar from "/src/components/PlayerAvatar"
import WordPuzzle from "../../components/WordPuzzle.jsx"
import WrongGuess from "../../components/WrongGuess.jsx"
import FetchStatusMessage from "../../components/FetchStatusMessage.jsx"
import Button from "/src/components/Button"
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
    const [isActive, setIsActive] = useState(0)
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

    const updateLeaderboard = (name, score) => {
        const leaderboardData =
            JSON.parse(localStorage.getItem("leaderboard")) || []

        leaderboardData.push({ name, score })
        leaderboardData.sort((a, b) => b.score - a.score)
        leaderboardData.splice(10)
        localStorage.setItem("leaderboard", JSON.stringify(leaderboardData))
    }

    useEffect(() => {
        const leaderboardData =
            JSON.parse(localStorage.getItem("leaderboard")) || []
        leaderboardData.splice(3)
        localStorage.setItem("leaderboard", JSON.stringify(leaderboardData))
    }, [])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter" && isNextPuzzleClicked) e.preventDefault()
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isNextPuzzleClicked])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter" && isHomePageButtonClicked) e.preventDefault()
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isHomePageButtonClicked])

    useEffect(() => {
        const data = window.localStorage.getItem("AVATAR_KEY")
        setSelectedAvatar(JSON.parse(data))
    }, [])

    const fetchPuzzle = async () => {
        setError(null)
        setGuessedLetters([])
        setPuzzle("")
        setIsLoading(true)

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

    const isWinner =
        guessedLetters.length === 0
            ? false
            : puzzle
                  .split("")
                  .filter((letter) => ![":", "'", " "].includes(letter))
                  .every((filteredLetter) =>
                      guessedLetters.includes(filteredLetter)
                  )

    useEffect(() => {
        if (isWinner) {
            setShowWinModal(true)
            setShowLoseModal(false)
            setShowLeaveGameModal(false)
            setPlayerWins(true)
        }
    }, [isWinner])

    useEffect(() => {
        if (isWinner && playerWins) {
            const numberOfPointsWon = 6 - incorrectLetters.length
            setPointsWon(numberOfPointsWon)
            setCurrentScore((prevScore) => prevScore + pointsWon)
        }
    }, [guessedLetters, playerWins, isWinner, pointsWon])

    useEffect(() => {
        if (playerWins && currentScore > 0) {
            localStorage.setItem(
                "PLAYERS_HIGHEST_SCORE_KEY",
                JSON.stringify(currentScore)
            )
        }
    }, [playerWins, currentScore])

    useEffect(() => {
        if (isLoser) {
            const playersLastHighScore = JSON.parse(
                localStorage.getItem("PLAYERS_HIGHEST_SCORE_KEY")
            )
            updateLeaderboard(playerName, playersLastHighScore)
        }
    }, [isLoser, playerName])

    useEffect(() => {
        if (isLoser) {
            setPointsWon(0)
            setCurrentScore(0)
            setShowLoseModal(true)
            setShowWinModal(false)
            setShowLeaveGameModal(false)
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
        setIsHomePageButtonClicked(true)
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
        navigate("/")
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

    const handleMouseLeave = () => {
        setIsActive("")
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (showWinModal) {
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
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [showWinModal, winModalbuttons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (showWinModal && e.key === "Enter") {
                const currentIndex = winModalbuttons.findIndex(
                    (button) => button.id === isActive
                )
                winModalbuttons[currentIndex].click()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [showWinModal, winModalbuttons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!showWinModal && showLeaveGameModal) {
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
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [showWinModal, showLeaveGameModal, leaveGameModalbuttons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!showWinModal && showLeaveGameModal && e.key === "Enter") {
                const currentIndex = leaveGameModalbuttons.findIndex(
                    (button) => button.id === isActive
                )

                leaveGameModalbuttons[currentIndex].click()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [showWinModal, showLeaveGameModal, leaveGameModalbuttons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (showLoseModal) {
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
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [showLoseModal, loseModalbuttons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (showLoseModal && e.key === "Enter") {
                const currentIndex = loseModalbuttons.findIndex(
                    (button) => button.id === isActive
                )
                loseModalbuttons[currentIndex].click()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [showLoseModal, loseModalbuttons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!showLoseModal && showLeaveGameModal) {
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
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [showLoseModal, showLeaveGameModal, leaveGameModalbuttons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!showLoseModal && showLeaveGameModal && e.key === "Enter") {
                const currentIndex = leaveGameModalbuttons.findIndex(
                    (button) => button.id === isActive
                )

                leaveGameModalbuttons[currentIndex].click()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [showLoseModal, showLeaveGameModal, leaveGameModalbuttons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (
                showLeaveGameModal &&
                isHomePageButtonClicked &&
                e.key === "Enter"
            ) {
                const currentIndex = leaveGameModalbuttons.findIndex(
                    (button) => button.id === isActive
                )

                leaveGameModalbuttons[currentIndex].click()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isHomePageButtonClicked, showLeaveGameModal, leaveGameModalbuttons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === "b") {
                setShowLeaveGameModal(true)
                setIsHomePageButtonClicked(true)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === "q") {
                handleNextPuzzle()
                setIsNextPuzzleClicked(true)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    const renderLeaderboard = () => {
        const leaderboardData =
            JSON.parse(localStorage.getItem("leaderboard")) || []

        return (
            <>
                <h2>Top Ten Leaderboard</h2>
                <ul>
                    {leaderboardData.map((entry, index) => (
                        <li key={index}>
                            {index + 1}. {entry.name}: {entry.score}
                        </li>
                    ))}
                </ul>
            </>
        )
    }

    const footerButtons = [
        {
            id: 0,
            text: "Back to home page",
            onClick: handleQuit,
        },
        {
            id: 1,
            text: "Next Puzzle",
            onClick: handleNextPuzzle,
        },
    ]

    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.header}>
                    <h1>Single Player - Game play</h1>
                </div>
                <div className={styles.stats}>
                    <div className={styles.playerInfo}>
                        <div className={styles.playerAvatar}>
                            <PlayerAvatar selectedAvatar={selectedAvatar} />
                        </div>
                        <div className={styles.nameAndScore}>
                            <p>Player Name: {playerName}</p>
                            <p>Current Score: {currentScore}</p>
                        </div>
                    </div>
                    <div className={styles.leaderboard}>
                        {renderLeaderboard()}
                    </div>
                </div>
                <div className={styles.mainSection}>
                    <div className={styles.wrongGuess}>
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
                        <FetchStatusMessage
                            isLoading={isLoading}
                            error={error}
                        />
                    </div>
                    <div>
                        <Keyboard
                            activeLetters={activeLetters}
                            inactiveLetters={incorrectLetters}
                            onLetterClick={addGuessedLetter}
                            disabled={isWinner || isLoser}
                        />
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.footerButtons}>
                        {footerButtons.map((button) => (
                            <Button
                                key={button.id}
                                text={button.text}
                                onMouseEnter={() => handleMouseEnter(button.id)}
                                onMouseLeave={() => handleMouseLeave(button.id)}
                                isActive={button.id === isActive}
                                onClick={button.onClick}
                            />
                        ))}
                    </div>
                    <div className={styles.footerButtonKeyCommands}>
                        <p>Ctrl + B</p>
                        <p>Ctrl + Q</p>
                    </div>
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
