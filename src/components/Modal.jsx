import { useState, useEffect } from "react"
import "/src/App.css"
import pop from "/src/assets/pop.gif"
import loading from "/src/assets/loading.gif"
import profile from "/src/assets/profile.png"
import linkedin from "/src/assets/linkedin.png"
import github from "/src/assets/github.png"
import githubdark from "/src/assets/githubdark.png"

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
    loadingPage,
    aboutMe,
    handleCancelAndPlaySound,
    isDarkMode,
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
            click: handleCancelAndPlaySound,
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
                        <p className="modalText">
                            Congrats! You won {pointsWon}{" "}
                            {pointsWon === 1 ? "point!" : "points!"}
                        </p>
                        <p className="modalText">
                            Your current score is {currentScore}
                        </p>
                        <p className="modalText">Next puzzle?</p>

                        <div className="buttonsContainerModal">
                            {winModalButtons.map((button) => (
                                <div className="buttonWrapperModal">
                                    <button
                                        key={button.id}
                                        onMouseEnter={() =>
                                            handleMouseEnter(button.id)
                                        }
                                        onMouseLeave={handleMouseLeave}
                                        onClick={button.click}
                                        className={
                                            button.id === isActive
                                                ? "winActiveButtonModal"
                                                : "winButtonModal"
                                        }
                                    >
                                        {button.text}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="confettiPopContainer">
                        <img src={pop} className="confettiPop" />
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
                        <p className="modalText">Nice Try! Play Again?</p>

                        <div className="buttonsContainerModal">
                            {loseModalButtons.map((button) => (
                                <div className="buttonWrapperModal">
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
                                                : "buttonModal"
                                        }
                                    >
                                        {button.text}
                                    </button>
                                </div>
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
                        <p className="modalText">
                            Leave game and return to home page?
                        </p>

                        <div className="buttonsContainerModal">
                            {leaveGameModalButtons.map((button) => (
                                <div className="buttonWrapperModal">
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
                                                : "buttonModal"
                                        }
                                    >
                                        {button.text}
                                    </button>
                                </div>
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
                        <p className="modalText">
                            Congrats, {playerNameOne}! You won the game!
                        </p>
                        <p className="modalText">Next puzzle?</p>

                        <div className="buttonsContainerModal">
                            {winModalButtons.map((button) => (
                                <div className="buttonWrapperModal">
                                    <button
                                        key={button.id}
                                        onMouseEnter={() =>
                                            handleMouseEnter(button.id)
                                        }
                                        onMouseLeave={handleMouseLeave}
                                        onClick={button.click}
                                        className={
                                            button.id === isActive
                                                ? "winActiveButtonModal"
                                                : "winButtonModal"
                                        }
                                    >
                                        {button.text}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="confettiPopContainer">
                        <img src={pop} className="confettiPop" />
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
                        <p className="modalText">
                            Congrats, {playerNameTwo}! You won the game!
                        </p>
                        <p className="modalText">Next puzzle?</p>

                        <div className="buttonsContainerModal">
                            {winModalButtons.map((button) => (
                                <div className="buttonWrapperModal">
                                    <button
                                        key={button.id}
                                        onMouseEnter={() =>
                                            handleMouseEnter(button.id)
                                        }
                                        onMouseLeave={handleMouseLeave}
                                        onClick={button.click}
                                        className={
                                            button.id === isActive
                                                ? "winActiveButtonModal"
                                                : "winButtonModal"
                                        }
                                    >
                                        {button.text}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="confettiPopContainer">
                        <img src={pop} className="confettiPop" />
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
                        <div className="buttonsContainerLeaderboard">
                            <button
                                className="activeButtonModal"
                                onClick={handleCancelAllModals}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {allPuzzlesPlayed && (
                <div>
                    <div
                        className={"overlay"}
                        onClick={handleCancelAllModals}
                    ></div>
                    <div className={"puzzlesPlayedModal"}>
                        {singlePlayer && (
                            <p className="modalText">
                                Amazing! You've completed all puzzles with a
                                total score of {currentScore} points. Thank you
                                for playing Balloon Pop! Would you like to play
                                again?
                            </p>
                        )}
                        {twoPlayer && (
                            <p className="modalText">
                                Amazing! You've completed all puzzles. Thank you
                                for playing Balloon Pop! Would you like to play
                                again?
                            </p>
                        )}
                        <div className="buttonsContainerModal">
                            {allPuzzlesPlayedModalButtons.map((button) => (
                                <div className="buttonWrapperModal">
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
                                                : "buttonModal"
                                        }
                                    >
                                        {button.text}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="confettiPopContainer">
                        <img src={pop} className="confettiPop" />
                    </div>
                </div>
            )}
            {loadingPage && (
                <div>
                    <div className="loadingPageOverlay"></div>
                    <div className="loadingPageModal">
                        <p className="modalTextLoading">LOADING</p>
                        <div className="loadingImageContainer">
                            <img src={loading} className="loading" />
                        </div>
                    </div>
                </div>
            )}
            {aboutMe && (
                <div>
                    <div
                        onClick={handleCancelAllModals}
                        className={"overlay"}
                    ></div>
                    <div className={"aboutMeModal"}>
                        <div className="aboutMeHeader">
                            <div className="profileContainer">
                                <img
                                    src={profile}
                                    alt="profile"
                                    className="profile"
                                />
                            </div>

                            <div className="textContainer">
                                <p className="aboutMeText">Hi There,</p>
                                <p className="aboutMeText">I'm Chelsea!</p>
                            </div>
                        </div>

                        <p className="aboutMeParagraph">
                            Thanks for checking out Balloon Pop! Formally a
                            Pharmacy Technician, currently living in
                            Newfoundland and Labrador, I've recently made a
                            career change to Software Developer. Everything I've
                            learned to develop this game, I've learned from the
                            coaches and fellow students at GetCoding (Big thanks
                            to them!). If you would like to work on a project
                            together, feel free to connect with me on LinkedIn.
                            Have fun playing!
                        </p>
                        <div className="linksContainer">
                            <a
                                href="https://github.com/chelseajcaines/balloon-pop-game"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={isDarkMode ? githubdark : github}
                                    alt="github"
                                    className="link"
                                />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/chelsea-caines/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={linkedin}
                                    alt="linkedin"
                                    className="link"
                                />
                            </a>
                        </div>

                        <div className="buttonsContainerModal"></div>
                    </div>
                    <div className="confettiPopContainer">
                        <img src={pop} className="confettiPop" />
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal
