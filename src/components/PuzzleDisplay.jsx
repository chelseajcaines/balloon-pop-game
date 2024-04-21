import "/src/App.css"

const PuzzleDisplay = ({ puzzle, guessedLetters, reveal = false }) => {
    const words = puzzle.split(/\s+/).filter((word) => word.trim() !== "")

    const firstLineWords = words.slice(0, 4)
    const secondLineWords = words.slice(4, 8)
    const thirdLineWords = words.slice(8, 15)
    return (
        <>
            <div className="puzzleContainer">
                <div className="puzzleLine">
                    {firstLineWords.map((word, index) => (
                        <div key={index} className="puzzleWord">
                            {word.split("").map((letter, index) => (
                                <div
                                    key={index}
                                    className={`${"puzzleLetter"} ${
                                        letter === ":" ||
                                        letter === "'" ||
                                        letter === " "
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
                                            !guessedLetters.includes(letter) &&
                                            reveal
                                                ? "red"
                                                : "white"
                                        }`}
                                    >
                                        {letter}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                {/* Render the second line of words */}
                <div className="puzzleLine">
                    {secondLineWords.map((word, index) => (
                        <div key={index} className="puzzleWord">
                            {word.split("").map((letter, index) => (
                                <div
                                    key={index}
                                    className={`${"puzzleLetter"} ${
                                        letter === ":" ||
                                        letter === "'" ||
                                        letter === " "
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
                                            !guessedLetters.includes(letter) &&
                                            reveal
                                                ? "red"
                                                : "white"
                                        }`}
                                    >
                                        {letter}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="puzzleLine">
                    {thirdLineWords.map((word, index) => (
                        <div key={index} className="puzzleWord">
                            {word.split("").map((letter, index) => (
                                <div
                                    key={index}
                                    className={`${"puzzleLetter"} ${
                                        letter === ":" ||
                                        letter === "'" ||
                                        letter === " "
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
                                            !guessedLetters.includes(letter) &&
                                            reveal
                                                ? "red"
                                                : "white"
                                        }`}
                                    >
                                        {letter}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* {puzzle.split("").map((letter, index) => (
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
                                    : "white"
                            }`}
                        >
                            {letter}
                        </div>
                    </div>
                ))} */}
            </div>
        </>
    )
}

export default PuzzleDisplay
