import { alphabetArray } from "/src/data/const.js"
import "/src/App.css"
import { useEffect } from "react"

const Keyboard = ({
    twoPlayer,
    disabled = false,
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

export default Keyboard
