import { alphabetArray } from "../data/const.js"
import { useLocation } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import PlayerAvatar from "/src/components/PlayerAvatar"

const SinglePlayerGamePlay = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const playerName = params.get("name")

    const [lettersToClick, setLettersToClick] = useState(alphabetArray)
    const [puzzle, setPuzzle] = useState([])
    const [lettersToDisplay, setLettersToDisplay] = useState(puzzle)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const [movesCount, setMovesCount] = useState(0)

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

            convertPuzzleToArray(randomPuzzle)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const convertPuzzleToArray = (randomPuzzle) => {
        const newArray = randomPuzzle.split("").map((letter) => ({
            letter,
            guessed: false,
        }))
        setPuzzle(newArray)
    }

    console.log(puzzle)

    const handleLetterClick = (index) => {
        if (lettersToClick[index].clicked) {
            return
        }
        const updatedLettersToDisplay = [...lettersToDisplay]
        if (lettersToClick[index].clicked === lettersToDisplay[index]) {
            updatedLettersToDisplay[index].guessed = true
        }
        setLettersToDisplay(updatedLettersToDisplay)
        const updatedLettersToClick = [...lettersToClick]
        updatedLettersToClick[index].clicked = true
        setLettersToClick(updatedLettersToClick)

        setMovesCount((prevMoves) => prevMoves + 1)
    }

    useEffect(() => {
        fetchPuzzle()
    }, [])

    return (
        <>
            <h1>Single Player - Game play</h1>
            <PlayerAvatar />
            <p>Player Name: {playerName}</p>
            <MovesCountDisplay movesCount={movesCount} />
            <HiddenPuzzle lettersToDisplay={lettersToDisplay} />
            <PuzzleFetcher isLoading={isLoading} error={error} />
            <GuessLetterButtons
                lettersToClick={lettersToClick}
                handleLetterClick={handleLetterClick}
            />
        </>
    )
}

const HiddenPuzzle = ({ lettersToDisplay }) => {
    return (
        <div>
            {lettersToDisplay.map((letterObj, index) => (
                <div
                    key={index}
                    style={{ display: "inline-block", margin: "5px" }}
                >
                    {letterObj.guessed ? letterObj.letter : "_"}
                </div>
            ))}
        </div>
    )
}

const PuzzleFetcher = ({ isLoading, error }) => {
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

const GuessLetterButtons = ({ lettersToClick, handleLetterClick }) => {
    return (
        <div>
            {lettersToClick.map((letterObj, index) => (
                <button
                    key={index}
                    onClick={() => handleLetterClick(index)}
                    style={{ color: letterObj.clicked ? "red" : "black" }}
                >
                    {letterObj.value}
                </button>
            ))}
        </div>
    )
}

const MovesCountDisplay = ({ movesCount }) => {
    return <div>Moves:{movesCount}</div>
}

export default SinglePlayerGamePlay
