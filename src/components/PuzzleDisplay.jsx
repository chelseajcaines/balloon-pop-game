import "/src/App.css"
import { useState } from "react"
import { useEffect } from "react"

const PuzzleDisplay = ({ puzzle, guessedLetters, reveal = false }) => {
    const words = puzzle.split(/\s+/).filter((word) => word.trim() !== "")

    const firstLineWords = words.slice(0, 4)
    const secondLineWords = words.slice(4, 8)
    const thirdLineWords = words.slice(8, 15)

    const firstLineWordsTwo = words.slice(0, 3)
    const secondLineWordsTwo = words.slice(3, 6)
    const thirdLineWordsTwo = words.slice(6, 10)
    const fourthLineWordsTwo = words.slice(10, 15)

    const [isMaxWidth649, setIsMaxWidth649] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMaxWidth649(window.innerWidth <= 649) // Adjust threshold as needed
        }

        // Set initial size
        handleResize()

        // Add event listener to handle window resize
        window.addEventListener("resize", handleResize)

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <>
            <div className="puzzleContainer">
                {!isMaxWidth649 ? (
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
                                                    guessedLetters.includes(
                                                        letter
                                                    ) ||
                                                    reveal ||
                                                    letter === ":" ||
                                                    letter === "'" ||
                                                    letter === " "
                                                        ? "visible"
                                                        : "hidden",
                                                ]} ${
                                                    !guessedLetters.includes(
                                                        letter
                                                    ) && reveal
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
                                                    guessedLetters.includes(
                                                        letter
                                                    ) ||
                                                    reveal ||
                                                    letter === ":" ||
                                                    letter === "'" ||
                                                    letter === " "
                                                        ? "visible"
                                                        : "hidden",
                                                ]} ${
                                                    !guessedLetters.includes(
                                                        letter
                                                    ) && reveal
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
                                                    guessedLetters.includes(
                                                        letter
                                                    ) ||
                                                    reveal ||
                                                    letter === ":" ||
                                                    letter === "'" ||
                                                    letter === " "
                                                        ? "visible"
                                                        : "hidden",
                                                ]} ${
                                                    !guessedLetters.includes(
                                                        letter
                                                    ) && reveal
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
                    </div>
                ) : (
                    <div className="puzzleContainer">
                        <div className="puzzleLine">
                            {firstLineWordsTwo.map((word, index) => (
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
                                                    guessedLetters.includes(
                                                        letter
                                                    ) ||
                                                    reveal ||
                                                    letter === ":" ||
                                                    letter === "'" ||
                                                    letter === " "
                                                        ? "visible"
                                                        : "hidden",
                                                ]} ${
                                                    !guessedLetters.includes(
                                                        letter
                                                    ) && reveal
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
                            {secondLineWordsTwo.map((word, index) => (
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
                                                    guessedLetters.includes(
                                                        letter
                                                    ) ||
                                                    reveal ||
                                                    letter === ":" ||
                                                    letter === "'" ||
                                                    letter === " "
                                                        ? "visible"
                                                        : "hidden",
                                                ]} ${
                                                    !guessedLetters.includes(
                                                        letter
                                                    ) && reveal
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
                            {thirdLineWordsTwo.map((word, index) => (
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
                                                    guessedLetters.includes(
                                                        letter
                                                    ) ||
                                                    reveal ||
                                                    letter === ":" ||
                                                    letter === "'" ||
                                                    letter === " "
                                                        ? "visible"
                                                        : "hidden",
                                                ]} ${
                                                    !guessedLetters.includes(
                                                        letter
                                                    ) && reveal
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
                            {fourthLineWordsTwo.map((word, index) => (
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
                                                    guessedLetters.includes(
                                                        letter
                                                    ) ||
                                                    reveal ||
                                                    letter === ":" ||
                                                    letter === "'" ||
                                                    letter === " "
                                                        ? "visible"
                                                        : "hidden",
                                                ]} ${
                                                    !guessedLetters.includes(
                                                        letter
                                                    ) && reveal
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
                    </div>
                )}

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
