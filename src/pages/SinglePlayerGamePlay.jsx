import { useLocation } from "react-router-dom"
import { useCallback, useState, useEffect } from "react"
import Keyboard from "../components/Keyboard.jsx"
import PlayerAvatar from "/src/components/PlayerAvatar"
import WordPuzzle from "../components/WordPuzzle.jsx"
import WrongGuess from "../components/WrongGuess.jsx"
import FetchStatusMessage from "../components/FetchStatusMessage.jsx"
import MovesCounter from "../components/MovesCounter.jsx"

const SinglePlayerGamePlay = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const playerName = params.get("name")

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [puzzle, setPuzzle] = useState("")
    const [guessedLetters, setGuessedLetters] = useState([])
    const [selectedAvatar, setSelectedAvatar] = useState("")
    const [movesCount, setMovesCount] = useState(0)
    const [winCount, setWinCount] = useState(0)

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
            console.log(uppercasePuzzle)
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

    const addGuessedLetter = useCallback(
        (letter) => {
            if (!guessedLetters.includes(letter) && !isWinner && !isLoser) {
                setGuessedLetters((currentLetters) => [
                    ...currentLetters,
                    letter,
                ])
                setMovesCount((count) => count + 1)
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
        console.log("initial win count", winCount)
        if (isWinner) {
            setWinCount((prevWinCount) => prevWinCount + 1)
        }

        if (isLoser) {
            setWinCount(0)
        }
    }, [isWinner, isLoser])

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
            <MovesCounter movesCount={movesCount} />
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
            <div>Wins: {winCount}</div>
            <div>
                {isWinner && "Winner! - Refresh to play again"}
                {isLoser && "Nice Try! - Refresh to play again"}
            </div>
        </>
    )
}

export default SinglePlayerGamePlay
