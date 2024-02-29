import { useState, useEffect } from "react"
import "/src/App.css"

const Modal = ({
    winModal,
    loseModal,
    leaveGameModal,
    handleCancelAllModals,
    handleWinThenContinue,
    handleLoseThenContinue,
    handleSaveAndLeaveGame,
    handleQuit,
    pointsWon,
    currentScore,
    playerOneModal,
    playerTwoModal,
    playerNameOne,
    playerNameTwo,
    leaderboardModal,
    leaderboard,
    allPuzzlesPlayed,
    handleStartFresh,
    singlePlayer,
    twoPlayer,
    handlePuzzlesPlayedThenQuit,
}) => {
    const [isActive, setIsActive] = useState(0)

    const winModalButtons = [
        {
            id: 0,
            text: "Continue",
            click: handleWinThenContinue,
        },
        {
            id: 1,
            text: "Quit",
            click: handleQuit,
        },
    ]

    const loseModalButtons = [
        {
            id: 0,
            text: "Yes",
            click: handleLoseThenContinue,
        },
        {
            id: 1,
            text: "No",
            click: handleQuit,
        },
    ]

    const leaveGameModalButtons = [
        {
            id: 0,
            text: "Yes",
            click: handleSaveAndLeaveGame,
        },
        {
            id: 1,
            text: "No",
            click: handleCancelAllModals,
        },
    ]

    const allPuzzlesPlayedModalButtons = [
        {
            id: 0,
            text: "Yes",
            click: handleStartFresh,
        },
        {
            id: 1,
            text: "No",
            click: handleQuit,
        },
    ]

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (winModal) {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    const currentIndex = winModalButtons.findIndex(
                        (button) => button.id === isActive
                    )
                    let nextIndex

                    if (e.key === "ArrowRight") {
                        nextIndex =
                            currentIndex < winModalButtons.length - 1
                                ? currentIndex + 1
                                : currentIndex
                    } else if (e.key === "ArrowLeft") {
                        nextIndex = currentIndex > 0 ? currentIndex - 1 : 0
                    }

                    setIsActive(winModalButtons[nextIndex].id)
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [winModal, winModalButtons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (winModal && e.key === "Enter") {
                const currentIndex = winModalButtons.findIndex(
                    (button) => button.id === isActive
                )
                winModalButtons[currentIndex].click()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [winModal, winModalButtons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (loseModal) {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    const currentIndex = loseModalButtons.findIndex(
                        (button) => button.id === isActive
                    )
                    let nextIndex

                    if (e.key === "ArrowRight") {
                        nextIndex =
                            currentIndex < loseModalButtons.length - 1
                                ? currentIndex + 1
                                : currentIndex
                    } else if (e.key === "ArrowLeft") {
                        nextIndex = currentIndex > 0 ? currentIndex - 1 : 0
                    }

                    setIsActive(loseModalButtons[nextIndex].id)
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [loseModal, loseModalButtons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (loseModal && e.key === "Enter") {
                const currentIndex = loseModalButtons.findIndex(
                    (button) => button.id === isActive
                )
                loseModalButtons[currentIndex].click()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [loseModal, loseModalButtons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (leaveGameModal) {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    const currentIndex = leaveGameModalButtons.findIndex(
                        (button) => button.id === isActive
                    )
                    let nextIndex

                    if (e.key === "ArrowRight") {
                        nextIndex =
                            currentIndex < leaveGameModalButtons.length - 1
                                ? currentIndex + 1
                                : currentIndex
                    } else if (e.key === "ArrowLeft") {
                        nextIndex = currentIndex > 0 ? currentIndex - 1 : 0
                    }
                    setIsActive(leaveGameModalButtons[nextIndex].id)
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [leaveGameModal, leaveGameModalButtons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (leaveGameModal && e.key === "Enter") {
                const currentIndex = leaveGameModalButtons.findIndex(
                    (button) => button.id === isActive
                )

                leaveGameModalButtons[currentIndex].click()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [leaveGameModal, leaveGameModalButtons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (playerOneModal) {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    const currentIndex = winModalButtons.findIndex(
                        (button) => button.id === isActive
                    )
                    let nextIndex

                    if (e.key === "ArrowRight") {
                        nextIndex =
                            currentIndex < winModalButtons.length - 1
                                ? currentIndex + 1
                                : currentIndex
                    } else if (e.key === "ArrowLeft") {
                        nextIndex = currentIndex > 0 ? currentIndex - 1 : 0
                    }
                    setIsActive(winModalButtons[nextIndex].id)
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [playerOneModal, winModalButtons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (playerOneModal && e.key === "Enter") {
                const currentIndex = winModalButtons.findIndex(
                    (button) => button.id === isActive
                )

                winModalButtons[currentIndex].click()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [playerOneModal, winModalButtons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (playerTwoModal) {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    const currentIndex = winModalButtons.findIndex(
                        (button) => button.id === isActive
                    )
                    let nextIndex

                    if (e.key === "ArrowRight") {
                        nextIndex =
                            currentIndex < winModalButtons.length - 1
                                ? currentIndex + 1
                                : currentIndex
                    } else if (e.key === "ArrowLeft") {
                        nextIndex = currentIndex > 0 ? currentIndex - 1 : 0
                    }
                    setIsActive(winModalButtons[nextIndex].id)
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [playerTwoModal, winModalButtons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (playerTwoModal && e.key === "Enter") {
                const currentIndex = winModalButtons.findIndex(
                    (button) => button.id === isActive
                )

                winModalButtons[currentIndex].click()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [playerTwoModal, winModalButtons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (leaderboardModal && e.key === "Enter") {
                handleCancelAllModals()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [leaderboardModal])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (allPuzzlesPlayed) {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    const currentIndex = allPuzzlesPlayedModalButtons.findIndex(
                        (button) => button.id === isActive
                    )
                    let nextIndex

                    if (e.key === "ArrowRight") {
                        nextIndex =
                            currentIndex <
                            allPuzzlesPlayedModalButtons.length - 1
                                ? currentIndex + 1
                                : currentIndex
                    } else if (e.key === "ArrowLeft") {
                        nextIndex = currentIndex > 0 ? currentIndex - 1 : 0
                    }
                    setIsActive(allPuzzlesPlayedModalButtons[nextIndex].id)
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [allPuzzlesPlayed, allPuzzlesPlayedModalButtons])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (allPuzzlesPlayed && e.key === "Enter") {
                const currentIndex = allPuzzlesPlayedModalButtons.findIndex(
                    (button) => button.id === isActive
                )

                allPuzzlesPlayedModalButtons[currentIndex].click()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [allPuzzlesPlayed, allPuzzlesPlayedModalButtons])

    const handleMouseEnter = (buttonId) => {
        setIsActive(buttonId)
    }

    const handleMouseLeave = () => {
        setIsActive("")
    }

    return (
        <>
            {winModal && (
                <div>
                    <div
                        onClick={handleCancelAllModals}
                        className={"overlay"}
                    ></div>
                    <div className={"modal"}>
                        <p>Congrats! You won {pointsWon} points!</p>
                        <p>Your current score is {currentScore}</p>
                        <p>Next puzzle?</p>

                        <div className="buttonsContainer">
                            {winModalButtons.map((button) => (
                                <button
                                    key={button.id}
                                    onMouseEnter={() =>
                                        handleMouseEnter(button.id)
                                    }
                                    onMouseLeave={handleMouseLeave}
                                    onClick={button.click}
                                    className={
                                        button.id === isActive
                                            ? "activeButtonModal"
                                            : ""
                                    }
                                >
                                    {button.text}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {loseModal && (
                <div>
                    <div
                        onClick={handleCancelAllModals}
                        className={"overlay"}
                    ></div>
                    <div className={"modal"}>
                        <p>Nice Try! Play Again?</p>

                        <div className="buttonsContainer">
                            {loseModalButtons.map((button) => (
                                <button
                                    key={button.id}
                                    onMouseEnter={() =>
                                        handleMouseEnter(button.id)
                                    }
                                    onMouseLeave={handleMouseLeave}
                                    onClick={button.click}
                                    className={
                                        button.id === isActive
                                            ? "activeButtonModal"
                                            : ""
                                    }
                                >
                                    {button.text}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {leaveGameModal && (
                <div>
                    <div
                        onClick={handleCancelAllModals}
                        className={"overlay"}
                    ></div>
                    <div className={"modal"}>
                        <p>Leave game and return to home page?</p>

                        <div className="buttonsContainer">
                            {leaveGameModalButtons.map((button) => (
                                <button
                                    key={button.id}
                                    onMouseEnter={() =>
                                        handleMouseEnter(button.id)
                                    }
                                    onMouseLeave={handleMouseLeave}
                                    onClick={
                                        allPuzzlesPlayed
                                            ? handlePuzzlesPlayedThenQuit
                                            : button.click
                                    }
                                    className={
                                        button.id === isActive
                                            ? "activeButtonModal"
                                            : ""
                                    }
                                >
                                    {button.text}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {playerOneModal && (
                <div>
                    <div
                        onClick={handleCancelAllModals}
                        className={"overlay"}
                    ></div>
                    <div className={"modal"}>
                        <p>Congrats, {playerNameOne}! You won the game!</p>
                        <p>Next puzzle?</p>

                        <div className="buttonsContainer">
                            {winModalButtons.map((button) => (
                                <button
                                    key={button.id}
                                    onMouseEnter={() =>
                                        handleMouseEnter(button.id)
                                    }
                                    onMouseLeave={handleMouseLeave}
                                    onClick={button.click}
                                    className={
                                        button.id === isActive
                                            ? "activeButtonModal"
                                            : ""
                                    }
                                >
                                    {button.text}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {playerTwoModal && (
                <div>
                    <div
                        onClick={handleCancelAllModals}
                        className={"overlay"}
                    ></div>
                    <div className={"modal"}>
                        <p>Congrats, {playerNameTwo}! You won the game!</p>
                        <p>Next puzzle?</p>

                        <div className="buttonsContainer">
                            {winModalButtons.map((button) => (
                                <button
                                    key={button.id}
                                    onMouseEnter={() =>
                                        handleMouseEnter(button.id)
                                    }
                                    onMouseLeave={handleMouseLeave}
                                    onClick={button.click}
                                    className={
                                        button.id === isActive
                                            ? "activeButtonModal"
                                            : ""
                                    }
                                >
                                    {button.text}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {leaderboardModal && (
                <div>
                    <div
                        onClick={handleCancelAllModals}
                        className={"overlay"}
                    ></div>
                    <div className={"leaderboardModal"}>
                        <div>{leaderboard}</div>
                        <button
                            className="activeButtonModal"
                            onClick={handleCancelAllModals}
                        >
                            Back to game
                        </button>
                    </div>
                </div>
            )}
            {allPuzzlesPlayed && (
                <div>
                    <div className={"overlay"}></div>
                    <div className={"modal"}>
                        {singlePlayer && (
                            <div>
                                Amazing! You've completed all puzzles with a
                                total score of ${currentScore} points. Thank you
                                for playing Balloon Pop! Would you like to play
                                again?
                            </div>
                        )}
                        {twoPlayer && (
                            <div>
                                Amazing! You've completed all puzzles. Thank you
                                for playing Balloon Pop! Would you like to play
                                again?
                            </div>
                        )}
                        {allPuzzlesPlayedModalButtons.map((button) => (
                            <button
                                key={button.id}
                                onMouseEnter={() => handleMouseEnter(button.id)}
                                onMouseLeave={handleMouseLeave}
                                onClick={button.click}
                                className={
                                    button.id === isActive
                                        ? "activeButtonModal"
                                        : ""
                                }
                            >
                                {button.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal
