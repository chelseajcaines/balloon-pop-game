import "/src/App.css"
import PlayerInfo from "../../components/PlayerInfo"
import Button from "../../components/Button"
import Modal from "/src/components/Modal"
import noSound from "/src/assets/noSound.png"
import sound from "/src/assets/sound.png"
import sun from "/src/assets/sun.png"
import moon from "/src/assets/moon.png"
import buttonClick from "/src/assets/buttonHover.flac"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { Howl } from "howler"

const TwoPlayerSetup = () => {
    const [playerTwoDisbaled, setPlayerTwoDisbaled] = useState(true)
    const [playerOneDisabled, setPlayerOneDisabled] = useState(false)
    const [bothPlayersDisabled, setBothPlayersDisabled] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(getInitialMode())
    const [showAboutMeModal, setShowAboutMeModal] = useState(false)
    const [soundOn, setSoundOn] = useState(true)
    const [isMaxWidth800, setIsMaxWidth800] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMaxWidth800(window.innerWidth <= 800) // Adjust threshold as needed
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

    useEffect(() => {
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
        src: buttonClick,
    })

    useEffect(() => {
        const savedSoundSetting = localStorage.getItem("SOUND_EFFECT_KEY")
        if (savedSoundSetting !== null) {
            setSoundOn(JSON.parse(savedSoundSetting))
        }
    }, [])

    const toggleSound = () => {
        setSoundOn(!soundOn)
        localStorage.setItem("SOUND_EFFECT_KEY", JSON.stringify(!soundOn))
    }

    const playSoundEffect = () => {
        if (soundOn) {
            buttonClickSound.play()
        }
    }

    function toggleDarkMode() {
        setIsDarkMode((prevMode) => !prevMode)
        playSoundEffect()
    }

    const handleClickAboutMe = () => {
        playSoundEffect()
        setShowAboutMeModal(true)
    }

    const navigate = useNavigate()

    useEffect(() => {
        setBothPlayersDisabled(false)
        setPlayerTwoDisbaled(true)
    }, [])

    const handleNextPlayer = () => {
        playSoundEffect()
        setPlayerTwoDisbaled(false)
        setPlayerOneDisabled(true)
    }

    const handleBothPlayers = () => {
        playSoundEffect()
        setPlayerTwoDisbaled(true)
        setBothPlayersDisabled(true)
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter" && bothPlayersDisabled) {
                navigate("/TwoPlayer/Categories/")
                playSoundEffect()
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [bothPlayersDisabled, navigate, soundOn])

    return (
        <>
            <div className="pageContainer">
                <p className="headerTwoPlayer">Player vs Player</p>
                <div className="mainWrapper">
                    <div className="players">
                        <div className="playerOneContainer">
                            <PlayerInfo
                                playerOne={true}
                                text={"P1 Ready"}
                                playerDisabled={playerOneDisabled}
                                onClick={handleNextPlayer}
                                setPlayerOneReady={handleNextPlayer}
                                twoPlayer={true}
                            />
                        </div>
                        <div className="playerTwoContainer">
                            <PlayerInfo
                                playerTwo={true}
                                text={"P2 Ready"}
                                playerDisabled={playerTwoDisbaled}
                                onClick={handleBothPlayers}
                                setPlayerTwoReady={handleBothPlayers}
                                twoPlayer={true}
                            />
                        </div>
                    </div>

                    <div className="footerPlayButton">
                        <Button
                            text="Start"
                            bothPlayersDisabled={bothPlayersDisabled}
                            onClick={() => {
                                if (bothPlayersDisabled) {
                                    playSoundEffect()
                                    navigate("/TwoPlayer/Categories/")
                                }
                            }}
                            isActive={bothPlayersDisabled}
                            twoPlayer={true}
                        />
                    </div>
                    <div
                        className={
                            !isMaxWidth800
                                ? "footerHomeTwoPlayerInfo"
                                : "footerHomeTwoPlayer"
                        }
                    >
                        <div
                            className={
                                !isMaxWidth800
                                    ? "imgWrapper"
                                    : "imgWrapperGamePlay"
                            }
                        >
                            <img
                                src={soundOn ? sound : noSound}
                                alt="sound ON/OFF"
                                className={
                                    !isMaxWidth800
                                        ? "innerImg"
                                        : "innerImgGamePlay"
                                }
                                onClick={toggleSound}
                            />
                        </div>
                        <button
                            className={
                                !isMaxWidth800
                                    ? "aboutMeButton"
                                    : "aboutMeButtonGamePlay"
                            }
                            onClick={handleClickAboutMe}
                        >
                            CLICK ME!
                        </button>

                        <div
                            className={
                                !isMaxWidth800
                                    ? "imgWrapper"
                                    : "imgWrapperGamePlay"
                            }
                        >
                            <img
                                src={isDarkMode ? sun : moon}
                                alt="dark mode"
                                className={
                                    !isMaxWidth800
                                        ? "innerImg"
                                        : "innerImgGamePlay"
                                }
                                onClick={toggleDarkMode}
                            />
                        </div>
                    </div>
                    {showAboutMeModal && (
                        <div>
                            <Modal
                                aboutMe={true}
                                handleCancelAllModals={() =>
                                    setShowAboutMeModal(false)
                                }
                                isDarkMode={isDarkMode}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default TwoPlayerSetup
