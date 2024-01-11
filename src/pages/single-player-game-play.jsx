import { alphabetArray } from "../data/const.js"
import { wrongAnswersArray } from "../data/const.js"
import { useLocation } from "react-router-dom"
import { useCallback, useState, useEffect } from "react"
import styles from "/src/stylesheets/Keyboard.module.css"
import PlayerAvatar from "/src/components/PlayerAvatar"

const SinglePlayerGamePlay = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const playerName = params.get("name")

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [puzzle, setPuzzle] = useState("")
    const [guessedLetters, setGuessedLetters] = useState([])

    const incorrectLetters = guessedLetters.filter(
        (letter) => !puzzle.includes(letter)
    )

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

    const isLoser = incorrectLetters.length >= 6
    const isWinner = puzzle
        .split("")
        .every((letter) => guessedLetters.includes(letter))

    const addGuessedLetter = useCallback(
        (letter) => {
            if (!guessedLetters.includes(letter)) {
                setGuessedLetters((currentLetters) => [
                    ...currentLetters,
                    letter,
                ])
            }
        },
        [guessedLetters]
    )

    useEffect(() => {
        fetchPuzzle()
    }, [])

    return (
        <>
            <h1>Single Player - Game play</h1>
            <PlayerAvatar />
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
                <div>
                    {isWinner && "Winner! - Refresh to play again"}
                    {isLoser && "Nice Try! - Refresh to play again"}
                </div>
            </div>
        </>
    )
}

const FetchStatusMessage = ({ isLoading, error }) => {
    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>{error && <p>Error: {error}</p>}</>
            )}
        </div>
    )
}

const WrongGuess = ({ numberOfGuesses }) => {
    return <div>{wrongAnswersArray.slice(0, numberOfGuesses).join(", ")}</div>
}

const WordPuzzle = ({ puzzle, guessedLetters, reveal = false }) => {
    return (
        <div>
            {puzzle.split("").map((letter, index) => (
                <div
                    key={index}
                    style={{
                        width: "15px",
                        height: "15px",
                        display: "inline-block",
                        padding: "5px",
                        borderBottom: "1px solid black",
                        margin: "3px",
                    }}
                >
                    <div
                        style={{
                            visibility:
                                guessedLetters.includes(letter) || reveal
                                    ? "visible"
                                    : "hidden",
                            color:
                                !guessedLetters.includes(letter) && reveal
                                    ? "red"
                                    : "black",
                        }}
                    >
                        {letter}
                    </div>
                </div>
            ))}
        </div>
    )
}

const Keyboard = ({
    activeLetters,
    inactiveLetters,
    onLetterClick,
    disabled = false,
}) => {
    return (
        <div>
            {alphabetArray.map((letter) => {
                const isActive = activeLetters.includes(letter)
                const isInactive = inactiveLetters.includes(letter)
                return (
                    <div key={letter} style={{ display: "inline-block" }}>
                        <button
                            onClick={() => onLetterClick(letter)}
                            className={`${styles.btn} ${
                                isActive ? styles.active : ""
                            }
                    ${isInactive ? styles.inactive : ""}`}
                            disabled={isActive || isInactive || disabled}
                        >
                            {letter}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default SinglePlayerGamePlay
