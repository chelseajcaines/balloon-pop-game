import { useLocation, useNavigate } from "react-router-dom"
import { useCallback, useState, useEffect } from "react"
import Keyboard from "../components/Keyboard.jsx"
import PlayerAvatar from "/src/components/PlayerAvatar"
import WordPuzzle from "../components/WordPuzzle.jsx"
import WrongGuess from "../components/WrongGuess.jsx"
import FetchStatusMessage from "../components/FetchStatusMessage.jsx"
import WinModal from "../components/WinModal.jsx"
import QuitModal from "/src/components/QuitModal"

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
    const [showQuitModal, setShowQuitModal] = useState(false)
    const [congratsMessage, setCongratsMessage] = useState("")
    const [currentScore, setCurrentScore] = useState(0)
    const [totalScore, setTotalScore] = useState(0)

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
            setTotalScore((prevScore) => prevScore + numberOfPointsWon)
            setShowWinModal(true)
            setCongratsMessage(`Congrats! You won ${pointsWon} points!`)
        }
    }, [isWinner, pointsWon, incorrectLetters.length])

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

    const handleNextPuzzleClick = () => {
        setCurrentScore((prevScore) => prevScore + pointsWon)
        setGuessedLetters([])
        setPuzzle("")
        setIsLoading(true)
        setShowWinModal(false)
        setPointsWon(0)
        fetchPuzzle()
    }

    const handleQuitButtonClick = () => {
        setShowQuitModal(true)
    }

    const handleYesButtonClick = () => {
        navigate("/")
    }

    const handleNoButtonClick = () => {
        setShowQuitModal(false)
        handleNextPuzzleClick()
    }

    return (
        <>
            <h1>Single Player - Game play</h1>
            <PlayerAvatar selectedAvatar={selectedAvatar} />
            <p>Player Name: {playerName}</p>
            <div style={{ paddingBottom: "10px" }}>
                <WrongGuess numberOfGuesses={incorrectLetters.length} />
            </div>
            <FetchStatusMessage isLoading={isLoading} error={error} />
            <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                <WordPuzzle
                    puzzle={puzzle}
                    guessedLetters={guessedLetters}
                    reveal={isLoser}
                />
            </div>

            <div style={{ paddingTop: "10px" }}>
                <Keyboard
                    activeLetters={guessedLetters.filter((letter) =>
                        puzzle.includes(letter)
                    )}
                    inactiveLetters={incorrectLetters}
                    onLetterClick={addGuessedLetter}
                    disabled={isWinner || isLoser}
                />
            </div>
            <div>{isLoser && "Nice Try! - Refresh to play again"}</div>
            <div>Current Score: {currentScore}</div>

            {isWinner && (
                <WinModal
                    isOpen={showWinModal}
                    congratsMessage={congratsMessage}
                    handleNextPuzzleClick={handleNextPuzzleClick}
                    handleQuitButtonClick={handleQuitButtonClick}
                />
            )}

            {showQuitModal && (
                <QuitModal
                    isOpen={showQuitModal}
                    handleYesButtonClick={handleYesButtonClick}
                    handleNoButtonClick={handleNoButtonClick}
                />
            )}
        </>
    )
}

export default SinglePlayerGamePlay
