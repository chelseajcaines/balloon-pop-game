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
        </>
    )
}

export default Modal
