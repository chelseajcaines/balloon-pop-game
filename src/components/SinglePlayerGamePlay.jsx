import { useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect, useCallback } from "react"
import { movieTitlesEndpoint } from "../data/apiEndpoints.js"
import Leaderboard from "/src/components/Leaderboard.jsx"
import GamePlaySection from "/src/components/GamePlaySection.jsx"
import Footer from "./Footer.jsx"
import PlayerInfoDisplay from "/src/components/PlayerInfoDisplay.jsx"
import Modal from "/src/components/Modal.jsx"
import "/src/App.css"

const SinglePlayerGamePlay = ({ movieTitles }) => {
    const navigate = useNavigate()

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const playerName = params.get("name")

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [puzzle, setPuzzle] = useState("")
    const [usedPuzzles, setUsedPuzzles] = useState([])
    const [guessedLetters, setGuessedLetters] = useState([])
    const [playerWins, setPlayerWins] = useState(false)
    const [pointsWon, setPointsWon] = useState(0)
    const [showWinModal, setShowWinModal] = useState(false)
    const [showLeaveGameModal, setShowLeaveGameModal] = useState(false)
    const [showLoseModal, setShowLoseModal] = useState(false)
    const [showLeaderboardModal, setShowLeaderboardModal] = useState(false)
    const [showAllPuzzlesPlayedModal, setShowAllPuzzlesPlayedModal] =
        useState(false)
    const [currentScore, setCurrentScore] = useState(0)
    const [isLeaderboardButtonClicked, setIsLeaderboardButtonClicked] =
        useState(false)
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

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter" && isLeaderboardButtonClicked)
                e.preventDefault()
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isLeaderboardButtonClicked])

    const chooseCategorie = () => {
        if (movieTitles) {
            return movieTitlesEndpoint
        }
    }

    const fetchPuzzle = async () => {
        setError(null)
        setGuessedLetters([])
        setPuzzle("")
        setIsLoading(true)

        try {
            let newPuzzle = ""
            do {
                const response = await fetch(chooseCategorie())
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
        if (isWinner || isLoser) {
            setUsedPuzzles((prevPuzzles) => [...prevPuzzles, puzzle])
        }
        console.log(usedPuzzles)
    }, [isLoser, isWinner, puzzle])

    useEffect(() => {
        if (usedPuzzles.length === 10 && (isWinner || isLoser)) {
            setShowAllPuzzlesPlayedModal(true)
            setShowWinModal(false)
            setShowLoseModal(false)
        }
    }, [usedPuzzles, isWinner, isLoser])

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
                setIsActive(true)
                setTimeout(() => {
                    setIsActive(false)
                }, 200)
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
        setShowAllPuzzlesPlayedModal(false)
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
        setShowLeaderboardModal(false)
        setShowAllPuzzlesPlayedModal(false)
    }

    const handlePuzzlesPlayedThenQuit = () => {
        setShowAllPuzzlesPlayedModal(true)
        setShowLeaveGameModal(false)
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

    const handleShowLeaderboard = () => {
        setShowLeaderboardModal(true)
        setIsLeaderboardButtonClicked(true)
    }

    const handleStartFresh = () => {
        setUsedPuzzles([])
        setGuessedLetters([])
        setPuzzle("")
        setIsLoading(true)
        setPointsWon(0)
        fetchPuzzle()
        handleCancelAllModals()
        setCurrentScore(0)
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

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === "y") {
                setShowLeaderboardModal(true)
                setIsLeaderboardButtonClicked(true)
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

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
                </div>
                <div className="mainSectionGamePlay">
                    <GamePlaySection
                        puzzle={puzzle}
                        isLoading={isLoading}
                        error={error}
                        guessedLetters={guessedLetters}
                        numberOfGuesses={incorrectLetters.length}
                        disabled={isWinner || isLoser}
                        reveal={isLoser}
                        activeLetters={activeLetters}
                        inactiveLetters={incorrectLetters}
                        handleGuessedLetter={addGuessedLetter}
                    />
                </div>

                <div className="footer">
                    <Footer
                        singlePlayer={true}
                        handleQuit={handleQuit}
                        handleNextPuzzle={handleNextPuzzle}
                        setShowLeaveGameModal={() =>
                            setShowLeaveGameModal(true)
                        }
                        handleShowLeaderboard={handleShowLeaderboard}
                    />
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
                {showLeaderboardModal && (
                    <Modal
                        leaderboardModal={true}
                        handleCancelAllModals={handleCancelAllModals}
                        leaderboard={<Leaderboard />}
                    />
                )}
                {showAllPuzzlesPlayedModal && (
                    <Modal
                        allPuzzlesPlayed={true}
                        handleQuit={handleQuit}
                        handleStartFresh={handleStartFresh}
                        currentScore={currentScore}
                        singlePlayer={true}
                        handlePuzzlesPlayedThenQuit={
                            handlePuzzlesPlayedThenQuit
                        }
                    />
                )}
            </div>
        </>
    )
}

export default SinglePlayerGamePlay
