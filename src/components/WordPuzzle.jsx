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

export default WordPuzzle
