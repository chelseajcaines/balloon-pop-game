import styles from "/src/stylesheets/WordPuzzle.module.css"

const WordPuzzle = ({ puzzle, guessedLetters, reveal = false }) => {
    return (
        <div className={styles.puzzleContainer}>
            {puzzle.split("").map((letter, index) => (
                <div
                    key={index}
                    className={`${styles.puzzleLetter} ${
                        letter === ":" || letter === "'" || letter === " "
                            ? ""
                            : styles["puzzleLetterBorder"]
                    }`}
                >
                    <div
                        className={`${
                            styles[
                                guessedLetters.includes(letter) ||
                                reveal ||
                                letter === ":" ||
                                letter === "'" ||
                                letter === " "
                                    ? "visible"
                                    : "hidden"
                            ]
                        } ${
                            !guessedLetters.includes(letter) && reveal
                                ? styles.red
                                : styles.black
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
