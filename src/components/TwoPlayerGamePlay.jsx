import "/src/App.css"
import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { movieTitlesEndpoint } from "../data/apiEndpoints"
import { phraseList } from "../data/const"
import { foodList } from "../data/const"
import { brandNames } from "../data/const"
import sun from "/src/assets/sun.png"
import moon from "/src/assets/moon.png"
import noSound from "/src/assets/noSound.png"
import sound from "/src/assets/sound.png"
import PlayerInfoDisplay from "/src/components/PlayerInfoDisplay"
import Keyboard from "./Keyboard"
import WrongGuess from "./WrongGuess"
import PuzzleDisplay from "./PuzzleDisplay"
import FetchStatus from "./FetchStatus"
// import Footer from "./Footer"
import Modal from "/src/components/Modal"
import Button from "/src/components/Button.jsx"
import { Howl } from "howler"

const TwoPlayerGamePlay = ({ text, movieTitles, phrases, food, brands }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [puzzle, setPuzzle] = useState("")
    const [guessedLetters, setGuessedLetters] = useState([])
    const [showLeaveGameModal, setShowLeaveGameModal] = useState(false)
    const [isHomePageButtonClicked, setIsHomePageButtonClicked] =
        useState(false)
    const [isNextPuzzleClicked, setIsNextPuzzleClicked] = useState(false)
    const [playerTwoTurn, setPlayerTwoTurn] = useState(false)
    const [currentLetter, setCurrentLetter] = useState("")
    const [playerOneScore, setPlayerOneScore] = useState(0)
    const [playerTwoScore, setPlayerTwoScore] = useState(0)
    const [showPlayerOneModal, setShowPlayerOneModal] = useState(false)
    const [showPlayerTwoModal, setShowPlayerTwoModal] = useState(false)
    const [showLoadingModal, setShowLoadingModal] = useState(false)
    const [playerNameOne, setPlayerNameOne] = useState("")
    const [playerNameTwo, setPlayerNameTwo] = useState("")
    const [showLoseModal, setShowLoseModal] = useState(false)
    const [usedPuzzles, setUsedPuzzles] = useState([])
    const [showAllPuzzlesPlayedModal, setShowAllPuzzlesPlayedModal] =
        useState(false)
    const [isDarkMode, setIsDarkMode] = useState(getInitialMode())
    const [showAboutMeModal, setShowAboutMeModal] = useState(false)
    const [soundOn, setSoundOn] = useState(true)
    const [isActiveQuit, setIsActiveQuit] = useState(false)
    const [isActiveNextPuzzle, setIsActiveNextPuzzle] = useState(false)

    useEffect(() => {
        // Update the body class when darkMode changes
        if (isDarkMode) {
            document.body.classList.add("dark-mode")
        } else {
            document.body.classList.remove("dark-mode")
        }
    }, [isDarkMode])

    useEffect(() => {
        localStorage.setItem("dark", JSON.stringify(isDarkMode))
    }, [isDarkMode])

    function getInitialMode() {
        const savedMode = JSON.parse(localStorage.getItem("dark"))
        return (
            savedMode ||
            window.matchMedia("(prefers-color-scheme: dark)").matches
        )
    }

    const buttonClickSound = new Howl({
        src: ["/src/assets/buttonHover.flac"],
    })

    const correctGuessSound = new Howl({
        src: ["/src/assets/rightGuess.mp3"],
    })

    const wrongGuessSound = new Howl({
        src: ["/src/assets/pop.wav"],
    })

    const winnerSound = new Howl({
        src: ["/src/assets/winner.wav"],
    })

    const loserSound = new Howl({
        src: ["/src/assets/loser.wav"],
    })

    useEffect(() => {
        const savedSoundSetting = localStorage.getItem("SOUND_EFFECT_KEY")
        if (savedSoundSetting !== null) {
            setSoundOn(JSON.parse(savedSoundSetting))
        }
    }, [])

    const toggleSound = () => {
        setSoundOn(!soundOn)
        // Persist the state to localStorage
        localStorage.setItem("SOUND_EFFECT_KEY", JSON.stringify(!soundOn))
    }

    const playButtonClickSoundEffect = () => {
        if (soundOn) {
            buttonClickSound.play()
        }
    }

    const playCorrectGuessSoundEffect = () => {
        if (soundOn) {
            correctGuessSound.play()
        }
    }

    const playWrongGuessSoundEffect = () => {
        if (soundOn) {
            wrongGuessSound.play()
        }
    }

    const playWinnerSoundEffect = () => {
        if (soundOn) {
            winnerSound.play()
        }
    }

    const playLoserSoundEffect = () => {
        if (soundOn) {
            loserSound.play()
        }
    }

    function toggleDarkMode() {
        setIsDarkMode((prevMode) => !prevMode)
        playButtonClickSoundEffect()
    }

    const navigate = useNavigate()

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter" && isNextPuzzleClicked) e.preventDefault()
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isNextPuzzleClicked])

    const fetchPuzzle = async () => {
        setError(null)
        setGuessedLetters([])
        setPuzzle("")
        setIsLoading(true)
        setShowLoadingModal(true)
        const timer = setTimeout(() => {
            setShowLoadingModal(false)
        }, 1000)

        if (movieTitles) {
            try {
                let newPuzzle = ""
                do {
                    const response = await fetch(movieTitlesEndpoint)
                    if (!response.ok) {
                        throw new Error("Failed to fetch movie data.")
                    }
                    const data = await response.json()
                    const randomPuzzleIndex = Math.floor(
                        Math.random() * data.items.length
                    )
                    newPuzzle = data.items[randomPuzzleIndex]?.title || ""
                } while (usedPuzzles.includes(newPuzzle.toUpperCase())) // Fetch new puzzle if it's already used

                const uppercasePuzzle = newPuzzle.toUpperCase()
                setPuzzle(uppercasePuzzle)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        } else if (phrases) {
            try {
                let newPuzzle = ""
                do {
                    // Access your array of puzzles directly instead of fetching from an API
                    const randomIndex = Math.floor(
                        Math.random() * phraseList.length
                    )
                    newPuzzle = phraseList[randomIndex] || ""
                } while (usedPuzzles.includes(newPuzzle.toUpperCase())) // Fetch new puzzle if it's already used

                const uppercasePuzzle = newPuzzle.toUpperCase()
                setPuzzle(uppercasePuzzle)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        } else if (food) {
            try {
                let newPuzzle = ""
                do {
                    // Access your array of puzzles directly instead of fetching from an API
                    const randomIndex = Math.floor(
                        Math.random() * foodList.length
                    )
                    newPuzzle = foodList[randomIndex] || ""
                } while (usedPuzzles.includes(newPuzzle.toUpperCase())) // Fetch new puzzle if it's already used

                const uppercasePuzzle = newPuzzle.toUpperCase()
                setPuzzle(uppercasePuzzle)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        } else if (brands) {
            try {
                let newPuzzle = ""
                do {
                    // Access your array of puzzles directly instead of fetching from an API
                    const randomIndex = Math.floor(
                        Math.random() * brandNames.length
                    )
                    newPuzzle = brandNames[randomIndex] || ""
                } while (usedPuzzles.includes(newPuzzle.toUpperCase())) // Fetch new puzzle if it's already used

                const uppercasePuzzle = newPuzzle.toUpperCase()
                setPuzzle(uppercasePuzzle)
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        }
        return () => clearTimeout(timer)
    }

    useEffect(() => {
        fetchPuzzle()
    }, [movieTitles, phrases, food, brands])

    const activeLetters = guessedLetters.filter((letter) =>
        puzzle.includes(letter)
    )

    const incorrectLetters = guessedLetters.filter(
        (letter) => !puzzle.includes(letter)
    )

    const isLoser = incorrectLetters.length >= 6

    const isWinner =
        guessedLetters.length === 0
            ? false
            : puzzle
                  .split("")
                  .filter((letter) => ![":", "'", " "].includes(letter))
                  .every((filteredLetter) =>
                      guessedLetters.includes(filteredLetter)
                  )

    const addGuessedLetter = useCallback(
        (letter) => {
            if (!guessedLetters.includes(letter) && !isWinner && !isLoser) {
                setGuessedLetters((currentLetters) => [
                    ...currentLetters,
                    letter,
                ])
            }
            if (!puzzle.includes(letter)) {
                setTimeout(() => {
                    playWrongGuessSoundEffect()
                }, 500)
            } else {
                playCorrectGuessSoundEffect()
            }
            setCurrentLetter(letter)
        },

        [
            guessedLetters,
            isWinner,
            isLoser,
            playerTwoTurn,
            activeLetters,
            soundOn,
        ]
    )

    useEffect(() => {
        if (isWinner || isLoser) {
            setUsedPuzzles((prevPuzzles) => [...prevPuzzles, puzzle])
        }
        console.log(usedPuzzles)
    }, [isLoser, isWinner, puzzle])

    useEffect(() => {
        if (usedPuzzles.length === 200 && (isWinner || isLoser)) {
            setShowAllPuzzlesPlayedModal(true)
            setShowLoseModal(false)
        }
    }, [usedPuzzles, isWinner, isLoser])

    useEffect(() => {
        const activeLettersNew = guessedLetters.filter((letter) =>
            puzzle.includes(letter)
        )
        if (!activeLetters.includes(currentLetter)) {
            setPlayerTwoTurn(!playerTwoTurn)
        }
        console.log(activeLettersNew.includes(currentLetter))
    }, [guessedLetters, currentLetter])

    useEffect(() => {
        const handleKeyDown = (e) => {
            const keyPressed = e.key.toUpperCase()

            if (/^[A-Z]$/.test(keyPressed) && !isWinner && !isLoser) {
                addGuessedLetter(keyPressed)
            }
        }

        window.addEventListener("keypress", handleKeyDown)

        return () => {
            window.removeEventListener("keypress", handleKeyDown)
        }
    }, [isWinner, isLoser, addGuessedLetter, soundOn])

    const handleNextPuzzle = () => {
        playButtonClickSoundEffect()
        setGuessedLetters([])
        setPuzzle("")
        setIsLoading(true)
        fetchPuzzle()
        setIsNextPuzzleClicked(true)
    }

    const handleQuit = () => {
        playButtonClickSoundEffect()
        setIsHomePageButtonClicked(true)
        setShowLeaveGameModal(true)
        setShowPlayerOneModal(false)
        setShowPlayerTwoModal(false)
        setShowLoseModal(false)
    }

    const handleCancelAllModals = () => {
        setShowLeaveGameModal(false)
        setShowPlayerOneModal(false)
        setShowPlayerTwoModal(false)
        setShowLoseModal(false)
    }

    const handleSaveAndLeaveGame = () => {
        playButtonClickSoundEffect()
        navigate("/")
    }

    const handleWinThenContinue = () => {
        playButtonClickSoundEffect()
        setShowPlayerOneModal(false)
        setShowPlayerTwoModal(false)
        handleNextPuzzle()
    }

    const handleLoseThenContinue = () => {
        playButtonClickSoundEffect()
        setGuessedLetters([])
        setPuzzle("")
        setIsLoading(true)
        handleCancelAllModals()
        setPointsWon(0)
        setCurrentScore(0)
        fetchPuzzle()
        handleCancelAllModals()
    }

    const handleStartFresh = () => {
        playButtonClickSoundEffect()
        setUsedPuzzles([])
        setGuessedLetters([])
        setPuzzle("")
        setIsLoading(true)
        setPointsWon(0)
        fetchPuzzle()
        handleCancelAllModals()
    }

    const handleCancelAndPlaySound = () => {
        playButtonClickSoundEffect()
        handleCancelAllModals()
    }

    const handleClickAboutMe = () => {
        playButtonClickSoundEffect()
        setShowAboutMeModal(true)
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === "b") {
                setShowLeaveGameModal(true)
                setIsHomePageButtonClicked(true)
                playButtonClickSoundEffect()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [soundOn])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === "q") {
                handleNextPuzzle()
                setIsNextPuzzleClicked(true)
                playButtonClickSoundEffect()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [soundOn])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter" && isHomePageButtonClicked) e.preventDefault()
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isHomePageButtonClicked])

    useEffect(() => {
        if (!playerTwoTurn && isWinner) {
            playWinnerSoundEffect()
            setPlayerOneScore((prevScore) => prevScore + 1)

            // Set showLoseModal to true after 2 seconds
            const timer = setTimeout(() => {
                setShowPlayerOneModal(true)
            }, 2000)

            // Clean up the timer to avoid memory leaks
            return () => clearTimeout(timer)
        } else if (playerTwoTurn && isWinner) {
            playWinnerSoundEffect()
            setPlayerTwoScore((prevScore) => prevScore + 1)

            // Set showLoseModal to true after 2 seconds
            const timer = setTimeout(() => {
                setShowPlayerTwoModal(true)
            }, 2000)

            // Clean up the timer to avoid memory leaks
            return () => clearTimeout(timer)
        }
    }, [playerTwoTurn, isWinner, soundOn])

    useEffect(() => {
        if (isLoser) {
            playLoserSoundEffect()
            const timer = setTimeout(() => {
                setShowLoseModal(true)
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [isLoser, soundOn])

    useEffect(() => {
        const data = window.localStorage.getItem("PLAYER_ONE_NAME_KEY")
        setPlayerNameOne(JSON.parse(data))
    }, [])

    useEffect(() => {
        const data = window.localStorage.getItem("PLAYER_TWO_NAME_KEY")
        setPlayerNameTwo(JSON.parse(data))
    }, [])

    return (
        <>
            <div className="gameHeader">
                <div className="headerLeftTwoPlayer">
                    <div className={!playerTwoTurn ? "playerOneTurn" : ""}>
                        <PlayerInfoDisplay
                            playerOne={true}
                            score={playerOneScore}
                            playerOneScore={playerOneScore}
                            playerTwoScore={playerTwoScore}
                        />
                    </div>
                </div>

                <div className="headerCenter">
                    <p
                        className="title"
                        style={{
                            marginTop: "10px",
                            marginBottom: "10px",
                            fontSize: "60px",
                        }}
                    >
                        {text}
                    </p>
                    <div className="wrongGuesses">
                        <WrongGuess numberOfGuesses={incorrectLetters.length} />
                    </div>
                </div>
                <div className="headerRightTwoPlayer">
                    <div className={playerTwoTurn ? "playerTwoTurn" : ""}>
                        <PlayerInfoDisplay
                            playerTwo={true}
                            score={playerTwoScore}
                            playerOneScore={playerOneScore}
                            playerTwoScore={playerTwoScore}
                        />
                    </div>
                </div>
            </div>

            <PuzzleDisplay puzzle={puzzle} guessedLetters={guessedLetters} />

            <FetchStatus isLoading={isLoading} error={error} />

            <Keyboard
                activeLetters={activeLetters}
                inactiveLetters={incorrectLetters}
                handleGuessedLetter={addGuessedLetter}
                twoPlayer={true}
                playerTwoTurn={playerTwoTurn}
            />

            <div className="footerHome" style={{ marginTop: "50px" }}>
                <div className="buttonWrapper">
                    <Button
                        text="Home"
                        onClick={handleQuit}
                        isActive={isActiveQuit}
                        onMouseEnter={() => setIsActiveQuit(true)}
                        onMouseLeave={() => setIsActiveQuit(false)}
                    />
                </div>
                <div className="imgWrapper">
                    <img
                        src={soundOn ? sound : noSound}
                        alt="sound ON/OFF"
                        className="innerImg"
                        onClick={toggleSound}
                    />
                </div>
                <button className="aboutMeButton" onClick={handleClickAboutMe}>
                    CLICK ME!
                </button>

                <div className="imgWrapper">
                    <img
                        src={isDarkMode ? sun : moon}
                        alt="dark mode"
                        className="innerImg"
                        onClick={toggleDarkMode}
                    />
                </div>
                <div className="buttonWrapper">
                    <Button
                        text="Next Puzzle"
                        onClick={handleNextPuzzle}
                        isActive={isActiveNextPuzzle}
                        onMouseEnter={() => setIsActiveNextPuzzle(true)}
                        onMouseLeave={() => setIsActiveNextPuzzle(false)}
                    />
                </div>
            </div>
            <div className="footerButtonKeyCommands">
                <p>Ctrl + B</p>
                <p>Ctrl + Q</p>
            </div>

            {showLeaveGameModal && (
                <Modal
                    leaveGameModal={true}
                    handleCancelAndPlaySound={handleCancelAndPlaySound}
                    handleCancelAllModals={handleCancelAllModals}
                    handleSaveAndLeaveGame={handleSaveAndLeaveGame}
                />
            )}
            {showPlayerOneModal && (
                <Modal
                    playerOneModal={true}
                    playerNameOne={playerNameOne}
                    handleCancelAllModals={handleCancelAllModals}
                    handleQuit={handleQuit}
                    handleWinThenContinue={handleWinThenContinue}
                />
            )}
            {showPlayerTwoModal && (
                <Modal
                    playerTwoModal={true}
                    playerNameTwo={playerNameTwo}
                    handleCancelAllModals={handleCancelAllModals}
                    handleQuit={handleQuit}
                    handleWinThenContinue={handleWinThenContinue}
                />
            )}
            {showLoseModal && (
                <Modal
                    loseModal={true}
                    handleCancelAllModals={handleCancelAllModals}
                    handleQuit={handleQuit}
                    handleLoseThenContinue={handleLoseThenContinue}
                />
            )}
            {showAllPuzzlesPlayedModal && (
                <Modal
                    allPuzzlesPlayed={true}
                    handleQuit={handleQuit}
                    handleStartFresh={handleStartFresh}
                    twoPlayer={true}
                />
            )}

            {showLoadingModal && <Modal loadingPage={true} />}

            {showAboutMeModal && (
                <div>
                    <Modal
                        aboutMe={true}
                        handleCancelAllModals={() => setShowAboutMeModal(false)}
                        isDarkMode={isDarkMode}
                    />
                </div>
            )}
        </>
    )
}

export default TwoPlayerGamePlay
