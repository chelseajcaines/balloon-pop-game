import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"
import Keyboard from "../../components/Keyboard.jsx"
import WordPuzzle from "../../components/WordPuzzle.jsx"
import WrongGuess from "../../components/WrongGuess.jsx"
import FetchStatusMessage from "../../components/FetchStatusMessage.jsx"
import Button from "/src/components/Button"
import PlayerInfoDisplay from "../../components/PlayerInfoDisplay.jsx"
import Modal from "../../components/Modal.jsx"
import "/src/App.css"

const SinglePlayerGamePlay = () => {
    const navigate = useNavigate()

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const playerName = params.get("name")

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [puzzle, setPuzzle] = useState("")
    const [guessedLetters, setGuessedLetters] = useState([])
    const [playerWins, setPlayerWins] = useState(false)
    const [pointsWon, setPointsWon] = useState(0)
    const [showWinModal, setShowWinModal] = useState(false)
    const [showLeaveGameModal, setShowLeaveGameModal] = useState(false)
    const [showLoseModal, setShowLoseModal] = useState(false)
    const [currentScore, setCurrentScore] = useState(0)
    const [isActive, setIsActive] = useState(0)
    const [isNextPuzzleClicked, setIsNextPuzzleClicked] = useState(false)
    const [isHomePageButtonClicked, setIsHomePageButtonClicked] =
        useState(false)

    const updateLeaderboard = (name, score) => {
        const leaderboardData =
            JSON.parse(localStorage.getItem("leaderboard")) || []

        leaderboardData.push({ name, score })
        leaderboardData.sort((a, b) => b.score - a.score)
        leaderboardData.splice(10)
        localStorage.setItem("leaderboard", JSON.stringify(leaderboardData))
    }

    useEffect(() => {
        const leaderboardData =
            JSON.parse(localStorage.getItem("leaderboard")) || []
        leaderboardData.splice(3)
        localStorage.setItem("leaderboard", JSON.stringify(leaderboardData))
    }, [])

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

        const endpoint = `https://api.themoviedb.org/3/list/8286021-movies?api_key=277f68e7e4a806dcf0eea77c75c6391f&language=en-US`

        try {
            const response = await fetch(endpoint)
            if (!response.ok) {
                throw new Error("Failed to fetch movie data.")
            }
            const data = await response.json()
            const randomPuzzleIndex = Math.floor(
                Math.random() * data.items.length
            )
            const randomPuzzle = data.items[randomPuzzleIndex]?.title || ""
            const uppercasePuzzle = randomPuzzle.toUpperCase()
            setPuzzle(uppercasePuzzle)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPuzzle()
    }, [])

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
        if (isWinner) {
            setShowWinModal(true)
            setShowLoseModal(false)
            setShowLeaveGameModal(false)
            setPlayerWins(true)
        }
    }, [isWinner])

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
            updateLeaderboard(playerName, playersLastHighScore)
        }
    }, [isLoser, playerName])

    useEffect(() => {
        if (isLoser) {
            setPointsWon(0)
            setCurrentScore(0)
            setShowLoseModal(true)
            setShowWinModal(false)
            setShowLeaveGameModal(false)
        }
    }, [isLoser])

    const addGuessedLetter = useCallback(
        (letter) => {
            if (!guessedLetters.includes(letter) && !isWinner && !isLoser) {
                setGuessedLetters((currentLetters) => [
                    ...currentLetters,
                    letter,
                ])
            }
        },
        [guessedLetters, isWinner, isLoser]
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
    }, [isWinner, isLoser, addGuessedLetter])

    const handleWinThenContinue = () => {
        setGuessedLetters([])
        setPuzzle("")
        setIsLoading(true)
        handleCancelAllModals()
        setPointsWon(0)
        fetchPuzzle()
    }

    const handleQuit = () => {
        setIsHomePageButtonClicked(true)
        setShowLeaveGameModal(true)
        setShowWinModal(false)
        setShowLoseModal(false)
    }

    const handleLoseThenContinue = () => {
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
    }

    const handleSaveAndLeaveGame = () => {
        navigate("/")
    }

    const handleNextPuzzle = () => {
        setGuessedLetters([])
        setPuzzle("")
        setIsLoading(true)
        setPointsWon(0)
        fetchPuzzle()
        setIsNextPuzzleClicked(true)
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === "b") {
                setShowLeaveGameModal(true)
                setIsHomePageButtonClicked(true)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === "q") {
                handleNextPuzzle()
                setIsNextPuzzleClicked(true)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    const renderLeaderboard = () => {
        const leaderboardData =
            JSON.parse(localStorage.getItem("leaderboard")) || []

        return (
            <>
                <h2>Top Ten Leaderboard</h2>
                <ul>
                    {leaderboardData.map((entry, index) => (
                        <li key={index}>
                            {index + 1}. {entry.name}: {entry.score}
                        </li>
                    ))}
                </ul>
            </>
        )
    }

    const footerButtons = [
        {
            id: 0,
            text: "Back to home page",
            onClick: handleQuit,
        },
        {
            id: 1,
            text: "Next Puzzle",
            onClick: handleNextPuzzle,
        },
    ]

    return (
        <>
            <div className="pageContainer">
                <div className="header">
                    <h1>Single Player - Game play</h1>
                </div>
                <div className="stats">
                    <div className="playerInfo">
                        <PlayerInfoDisplay
                            singlePlayer={true}
                            playerName={playerName}
                            score={currentScore}
                        />
                    </div>
                    <div className="leaderboard">{renderLeaderboard()}</div>
                </div>
                <div className="mainSectionGamePlay">
                    <div className="wrongGuess">
                        <WrongGuess numberOfGuesses={incorrectLetters.length} />
                    </div>
                    <div className="puzzleContainer">
                        <WordPuzzle
                            puzzle={puzzle}
                            guessedLetters={guessedLetters}
                            reveal={isLoser}
                        />
                    </div>
                    <div>
                        <FetchStatusMessage
                            isLoading={isLoading}
                            error={error}
                        />
                    </div>
                    <div>
                        <Keyboard
                            activeLetters={activeLetters}
                            inactiveLetters={incorrectLetters}
                            onLetterClick={addGuessedLetter}
                            disabled={isWinner || isLoser}
                        />
                    </div>
                </div>

                <div className="footer">
                    <div className="footerButtons">
                        {footerButtons.map((button) => (
                            <Button
                                key={button.id}
                                text={button.text}
                                onMouseEnter={() => handleMouseEnter(button.id)}
                                onMouseLeave={() => handleMouseLeave(button.id)}
                                isActive={button.id === isActive}
                                onClick={button.onClick}
                            />
                        ))}
                    </div>
                    <div className="footerButtonKeyCommands">
                        <p>Ctrl + B</p>
                        <p>Ctrl + Q</p>
                    </div>
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
                        handleCancelAllModals={handleCancelAllModals}
                        handleSaveAndLeaveGame={handleSaveAndLeaveGame}
                        handleQuit={handleQuit}
                    />
                )}
            </div>
        </>
    )
}

export default SinglePlayerGamePlay
