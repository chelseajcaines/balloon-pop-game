import { alphabetArray } from "../data/const.js"
import { useState } from "react"

const ChooseLetter = () => {
    const [selectedLetter, setSelectedLetter] = useState([])
    const [movesCount, setMovesCount] = useState(0)
    const handleLetterClick = (letter) => {
        setSelectedLetter((prevLetters) => {
            if (prevLetters.includes(letter)) {
                return prevLetters.filter((i) => i !== letter)
            } else {
                return [...prevLetters, letter]
            }
        })
        setMovesCount((prevMoves) => prevMoves + 1)
    }
    return (
        <>
            <div>Moves: {movesCount}</div>
            {alphabetArray.map((letter) => (
                <div
                    key={letter}
                    onClick={() => handleLetterClick(letter)}
                    style={{
                        display: "inline-block",
                        padding: "10px",
                        margin: "5px",
                        border: selectedLetter.includes(letter)
                            ? "1px solid red"
                            : "1px solid black",
                        cursor: "pointer",
                        color: selectedLetter.includes(letter)
                            ? "red"
                            : "black",
                    }}
                >
                    {letter}
                </div>
            ))}
        </>
    )
}

export default ChooseLetter
