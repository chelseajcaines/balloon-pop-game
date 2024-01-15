import { useLocation, useNavigate } from "react-router-dom"
import { useCallback, useState, useEffect } from "react"
import Keyboard from "../components/Keyboard.jsx"
import PlayerAvatar from "/src/components/PlayerAvatar"
import WordPuzzle from "../components/WordPuzzle.jsx"
import WrongGuess from "../components/WrongGuess.jsx"
import FetchStatusMessage from "../components/FetchStatusMessage.jsx"
import WinModal from "../components/WinModal.jsx"
import LoseModal from "../components/LoseModal.jsx"
import LeaveGameModal from "/src/components/LeaveGameModal"
import HighScore from "../components/HighScore.jsx"
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
    const [pointsWon, setPointsWon] = useState(0)
    const [showWinModal, setShowWinModal] = useState(false)
    const [showLeaveGameModal, setShowLeaveGameModal] = useState(false)
    const [showLoseModal, setShowLoseModal] = useState(false)
    const [currentScore, setCurrentScore] = useState(0)
    const [highScore, setHighScore] = useState(0)

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
            const numberOfPointsWon = 6 - incorrectLetters.length
            setPointsWon(numberOfPointsWon)
            setShowWinModal(true)
        }
    }, [isWinner, pointsWon, incorrectLetters.length])

    useEffect(() => {
        if (isLoser) {
            setPointsWon(0)
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
        const handleKeyPress = (event) => {
            const keyPressed = event.key.toUpperCase()

            if (/^[A-Z]$/.test(keyPressed) && !isWinner && !isLoser) {
                addGuessedLetter(keyPressed)
            }
        }

        window.addEventListener("keypress", handleKeyPress)

        return () => {
            window.removeEventListener("keypress", handleKeyPress)
        }
    }, [isWinner, isLoser, addGuessedLetter])

    useEffect(() => {
        const prevHighScore = localStorage.getItem("HIGH_SCORE_KEY")
        setHighScore(JSON.parse(prevHighScore))
    }, [])

    const handleSaveAndLeaveGame = () => {
        const newScore = currentScore + pointsWon
        const prevHighScore = JSON.parse(localStorage.getItem("HIGH_SCORE_KEY"))
        if (newScore <= prevHighScore) {
            localStorage.setItem(
                "HIGH_SCORE_KEY",
                JSON.stringify(prevHighScore)
            )
            navigate("/")
        } else if (newScore > prevHighScore) {
            localStorage.setItem("HIGH_SCORE_KEY", JSON.stringify(newScore))
            navigate("/")
        }
    }

    const handleSaveAndNextPuzzle = () => {
        setCurrentScore((prevScore) => prevScore + pointsWon)
        setGuessedLetters([])
        setPuzzle("")
        setIsLoading(true)
        setShowWinModal(false)
        setShowLeaveGameModal(false)
        setPointsWon(0)
        fetchPuzzle()
    }

    const handleNewPuzzle = () => {
        setGuessedLetters([])
        setPuzzle("")
        setIsLoading(true)
        setPointsWon(0)
        fetchPuzzle()
    }

    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.header}>
                    <h1>Single Player - Game play</h1>
                    <div className={styles.playerInfo}>
                        <div>
                            <PlayerAvatar selectedAvatar={selectedAvatar} />
                        </div>
                        <div>
                            <p>Player Name: {playerName}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.mainSection}>
                    <div style={{ paddingBottom: "10px" }}>
                        <WrongGuess numberOfGuesses={incorrectLetters.length} />
                    </div>
                    <div>
                        <FetchStatusMessage
                            isLoading={isLoading}
                            error={error}
                        />
                    </div>
                    <div className={styles.puzzleContainer}>
                        <WordPuzzle
                            puzzle={puzzle}
                            guessedLetters={guessedLetters}
                            reveal={isLoser}
                        />
                    </div>
                    <div style={{ paddingTop: "10px" }}>
                        <Keyboard
                            activeLetters={activeLetters}
                            inactiveLetters={incorrectLetters}
                            onLetterClick={addGuessedLetter}
                            disabled={isWinner || isLoser}
                        />
                    </div>
                    <div>
                        <p>Current Score: {currentScore}</p>
                    </div>
                    <div>
                        <HighScore highScore={highScore} />
                    </div>
                </div>
                <div className={styles.footer}>
                    <button onClick={() => setShowLeaveGameModal(true)}>
                        Back to home page
                    </button>
                    <button onClick={handleNewPuzzle}>New Puzzle</button>
                </div>
                <div>
                    {isWinner && (
                        <WinModal
                            isOpen={showWinModal}
                            points={pointsWon}
                            handleContinue={handleSaveAndNextPuzzle}
                            handleQuit={() => setShowLeaveGameModal(true)}
                            onCancel={handleSaveAndNextPuzzle}
                        />
                    )}
                </div>
                <div>
                    {isLoser && (
                        <LoseModal
                            isOpen={showLoseModal}
                            handleYesClick={handleSaveAndNextPuzzle}
                            handleNoClick={() => setShowLeaveGameModal(true)}
                            onCancel={handleSaveAndNextPuzzle}
                        />
                    )}
                </div>
                <div>
                    {(showWinModal || showLoseModal) && (
                        <LeaveGameModal
                            isOpen={showLeaveGameModal}
                            handleYesClick={handleSaveAndLeaveGame}
                            handleNoClick={handleSaveAndNextPuzzle}
                            onCancel={handleSaveAndNextPuzzle}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default SinglePlayerGamePlay
