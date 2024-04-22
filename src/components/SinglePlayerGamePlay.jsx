import { useNavigate } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"
import { movieTitlesEndpoint } from "../data/apiEndpoints.js"
import { phraseList } from "../data/const.js"
import { foodList } from "../data/const.js"
import { brandNames } from "../data/const.js"
import sun from "/src/assets/sun.png"
import moon from "/src/assets/moon.png"
import noSound from "/src/assets/noSound.png"
import sound from "/src/assets/sound.png"
import FetchStatus from "./FetchStatus.jsx"
import PuzzleDisplay from "./PuzzleDisplay.jsx"
import WrongGuess from "./WrongGuess.jsx"
import Leaderboard from "/src/components/Leaderboard.jsx"
import Keyboard from "/src/components/Keyboard.jsx"
import PlayerInfoDisplay from "/src/components/PlayerInfoDisplay.jsx"
import Modal from "/src/components/Modal.jsx"
import Button from "/src/components/Button.jsx"
import buttonClick from "/src/assets/buttonHover.flac"
import correctGuess from "/src/assets/rightGuess.mp3"
import wrongGuess from "/src/assets/pop.wav"
import winnerChime from "/src/assets/winner.wav"
import loserChime from "/src/assets/loser.wav"
import { Howl } from "howler"
import "/src/App.css"

const SinglePlayerGamePlay = ({ text, movieTitles, phrases, food, brands }) => {
    const navigate = useNavigate()

    const buttonClickSound = new Howl({
        src: buttonClick,
    })

    const correctGuessSound = new Howl({
        src: correctGuess,
    })

    const wrongGuessSound = new Howl({
        src: wrongGuess,
    })

    const winnerSound = new Howl({
        src: winnerChime,
    })

    const loserSound = new Howl({
        src: loserChime,
    })

    const [singlePlayerName, setSinglePlayerName] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [puzzle, setPuzzle] = useState("")
    const [usedPuzzles, setUsedPuzzles] = useState([])
    const [guessedLetters, setGuessedLetters] = useState([])
    const [playerWins, setPlayerWins] = useState(false)
    const [pointsWon, setPointsWon] = useState(0)
    const [showLoadingModal, setShowLoadingModal] = useState(false)
    const [showWinModal, setShowWinModal] = useState(false)
    const [showLeaveGameModal, setShowLeaveGameModal] = useState(false)
    const [showLoseModal, setShowLoseModal] = useState(false)
    const [showAllPuzzlesPlayedModal, setShowAllPuzzlesPlayedModal] =
        useState(false)
    const [currentScore, setCurrentScore] = useState(0)
    const [isNextPuzzleClicked, setIsNextPuzzleClicked] = useState(false)
    const [isHomePageButtonClicked, setIsHomePageButtonClicked] =
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

    useEffect(() => {
        const data = window.localStorage.getItem("SINGLE_PLAYER_NAME_KEY")
        setSinglePlayerName(JSON.parse(data))
    }, [])

    const updateLeaderboard = (name, score) => {
        const leaderboardData =
            JSON.parse(localStorage.getItem("leaderboard")) || []

        leaderboardData.push({ name, score })
        leaderboardData.sort((a, b) => b.score - a.score)
        leaderboardData.splice(10)
        localStorage.setItem("leaderboard", JSON.stringify(leaderboardData))
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter" && isNextPuzzleClicked) e.preventDefault()
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isNextPuzzleClicked])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter" && isHomePageButtonClicked) e.preventDefault()
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isHomePageButtonClicked])

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

    useEffect(() => {
        if (isWinner || isLoser) {
            setUsedPuzzles((prevPuzzles) => [...prevPuzzles, puzzle])
        }
        console.log(usedPuzzles)
    }, [isLoser, isWinner, puzzle])

    useEffect(() => {
        if (usedPuzzles.length === 200 && (isWinner || isLoser)) {
            setShowAllPuzzlesPlayedModal(true)
            setShowWinModal(false)
            setShowLoseModal(false)
        }
    }, [usedPuzzles, isWinner, isLoser])

    useEffect(() => {
        if (isWinner) {
            playWinnerSoundEffect()

            setShowLoseModal(false)
            setShowLeaveGameModal(false)
            setPlayerWins(true)
            // Set showLoseModal to true after 2 seconds
            const timer = setTimeout(() => {
                setShowWinModal(true)
            }, 1000)

            // Clean up the timer to avoid memory leaks
            return () => clearTimeout(timer)
        }
    }, [isWinner, soundOn])

    useEffect(() => {
        if (isWinner && playerWins) {
            const numberOfPointsWon = 6 - incorrectLetters.length
            setPointsWon(numberOfPointsWon)
            setCurrentScore((prevScore) => prevScore + pointsWon)
        }
    }, [guessedLetters, playerWins, isWinner, pointsWon])

    useEffect(() => {
        if (playerWins && currentScore > 0) {
            localStorage.setItem(
                "PLAYERS_HIGHEST_SCORE_KEY",
                JSON.stringify(currentScore)
            )
        }
    }, [playerWins, currentScore])

    useEffect(() => {
        if (isLoser) {
            const playersLastHighScore = JSON.parse(
                localStorage.getItem("PLAYERS_HIGHEST_SCORE_KEY")
            )
            if (playersLastHighScore != 0) {
                updateLeaderboard(singlePlayerName, playersLastHighScore)
            }
        }
    }, [isLoser, singlePlayerName])

    useEffect(() => {
        if (isLoser) {
            playLoserSoundEffect()
            setPointsWon(0)
            setCurrentScore(0)
            setShowWinModal(false)
            setShowLeaveGameModal(false)

            // Set showLoseModal to true after 2 seconds
            const timer = setTimeout(() => {
                setShowLoseModal(true)
            }, 3000)

            // Clean up the timer to avoid memory leaks
            return () => clearTimeout(timer)
        }
    }, [isLoser, soundOn])

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
        },
        [guessedLetters, isWinner, isLoser, puzzle, soundOn]
    )

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

    const handleWinThenContinue = () => {
        playButtonClickSoundEffect()
        setGuessedLetters([])
        setPuzzle("")
        setIsLoading(true)
        handleCancelAllModals()
        setPointsWon(0)
        fetchPuzzle()
    }

    const handleQuit = () => {
        playButtonClickSoundEffect()
        setIsHomePageButtonClicked(true)
        setShowLeaveGameModal(true)
        setShowWinModal(false)
        setShowLoseModal(false)
        setShowAllPuzzlesPlayedModal(false)
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
    }

    const handleCancelAllModals = () => {
        setShowWinModal(false)
        setShowLeaveGameModal(false)
        setShowLoseModal(false)
        setShowAllPuzzlesPlayedModal(false)
    }

    const handlePuzzlesPlayedThenQuit = () => {
        playButtonClickSoundEffect()
        setShowAllPuzzlesPlayedModal(true)
        setShowLeaveGameModal(false)
    }

    const handleSaveAndLeaveGame = () => {
        playButtonClickSoundEffect()
        navigate("/")
        const playersLastHighScore = JSON.parse(
            localStorage.getItem("PLAYERS_HIGHEST_SCORE_KEY")
        )
        if (playersLastHighScore != 0) {
            updateLeaderboard(singlePlayerName, playersLastHighScore)
        }
    }

    const handleNextPuzzle = () => {
        playButtonClickSoundEffect()
        setGuessedLetters([])
        setPuzzle("")
        setIsLoading(true)
        setPointsWon(0)
        fetchPuzzle()
        setIsNextPuzzleClicked(true)
    }

    const handleStartFresh = () => {
        playButtonClickSoundEffect()
        setUsedPuzzles([])
        setGuessedLetters([])
        setPuzzle("")
        setPointsWon(0)
        fetchPuzzle()
        handleCancelAllModals()
        setCurrentScore(0)
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

    return (
        <>
            <div className="gameHeader">
                <div className="headerLeft">
                    <PlayerInfoDisplay
                        singlePlayer={true}
                        playerName={singlePlayerName}
                        score={currentScore}
                    />
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
                <div className="headerRight">
                    <Leaderboard />
                </div>
            </div>

            <PuzzleDisplay
                puzzle={puzzle}
                guessedLetters={guessedLetters}
                reveal={isLoser}
            />

            <FetchStatus isLoading={isLoading} error={error} />

            <Keyboard
                disabled={isWinner || isLoser}
                activeLetters={activeLetters}
                inactiveLetters={incorrectLetters}
                handleGuessedLetter={addGuessedLetter}
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

            {isWinner && showWinModal && (
                <Modal
                    winModal={true}
                    handleCancelAllModals={handleCancelAllModals}
                    handleWinThenContinue={handleWinThenContinue}
                    handleQuit={handleQuit}
                    pointsWon={pointsWon}
                    currentScore={currentScore}
                />
            )}

            {isLoser && showLoseModal && (
                <Modal
                    loseModal={true}
                    handleCancelAllModals={handleCancelAllModals}
                    handleLoseThenContinue={handleLoseThenContinue}
                    handleQuit={handleQuit}
                />
            )}

            {showLeaveGameModal && (
                <Modal
                    leaveGameModal={true}
                    handleCancelAndPlaySound={handleCancelAndPlaySound}
                    handleCancelAllModals={handleCancelAllModals}
                    handleSaveAndLeaveGame={handleSaveAndLeaveGame}
                    handleQuit={handleQuit}
                />
            )}
            {showAllPuzzlesPlayedModal && (
                <Modal
                    allPuzzlesPlayed={true}
                    handleQuit={handleQuit}
                    handleStartFresh={handleStartFresh}
                    currentScore={currentScore}
                    singlePlayer={true}
                    handlePuzzlesPlayedThenQuit={handlePuzzlesPlayedThenQuit}
                    handleCancelAllModals={handleCancelAllModals}
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

export default SinglePlayerGamePlay
