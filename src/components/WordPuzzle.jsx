import "/src/App.css"

const WordPuzzle = ({ puzzle, guessedLetters, reveal = false }) => {
    return (
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
    )
}

export default WordPuzzle
