import { wrongAnswersArray } from "/src/data/const.js"
import { alphabetArray } from "/src/data/const.js"
import "/src/App.css"
import { useEffect } from "react"

const GamePlaySection = ({
    twoPlayer,
    puzzle,
    guessedLetters,
    numberOfGuesses,
    isLoading,
    error,
    disabled = false,
    reveal = false,
    activeLetters,
    inactiveLetters,
    handleGuessedLetter,
    playerTwoTurn,
}) => {
    const rows = [
        alphabetArray.slice(0, 10),
        alphabetArray.slice(10, 19),
        alphabetArray.slice(19),
    ]

    useEffect(() => {}, [playerTwoTurn])

    return (
        <>
            <div className="wrongGuess">
                {wrongAnswersArray.slice(0, numberOfGuesses).join(", ")}
            </div>

            <div className="puzzleContainer">
                {puzzle.split("").map((letter, index) => (
                    <div
                        key={index}
                        className={`${"puzzleLetter"} ${
                            letter === ":" || letter === "'" || letter === " "
                                ? ""
                                : ["puzzleLetterBorder"]
                        }`}
                    >
                        <div
                            className={`${[
                                guessedLetters.includes(letter) ||
                                reveal ||
                                letter === ":" ||
                                letter === "'" ||
                                letter === " "
                                    ? "visible"
                                    : "hidden",
                            ]} ${
                                !guessedLetters.includes(letter) && reveal
                                    ? "red"
                                    : "black"
                            }`}
                        >
                            {letter}
                        </div>
                    </div>
                ))}
            </div>
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>{error && <p>Error: {error}</p>}</>
                )}
            </div>
            <div className="keyboard">
                {rows.map((row, index) => (
                    <div key={index} className="row">
                        {row.map((letter) => {
                            const isActive = activeLetters.includes(letter)
                            const isInactive = inactiveLetters.includes(letter)
                            return (
                                <button
                                    key={letter}
                                    onClick={() => handleGuessedLetter(letter)}
                                    className={
                                        twoPlayer
                                            ? `${
                                                  playerTwoTurn
                                                      ? "btnP2"
                                                      : "btn"
                                              } ${isActive ? "active" : ""} ${
                                                  isInactive ? "inactive" : ""
                                              }`
                                            : `${"btn"} ${
                                                  isActive ? "active" : ""
                                              } ${isInactive ? "inactive" : ""}`
                                    }
                                    disabled={
                                        isActive || isInactive || disabled
                                    }
                                >
                                    {letter}
                                </button>
                            )
                        })}
                    </div>
                ))}
            </div>
        </>
    )
}

export default GamePlaySection
