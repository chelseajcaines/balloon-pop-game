import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { categoryButtons } from "../data/const"
import Button from "/src/components/Button"
import Modal from "../components/Modal"
import noSound from "/src/assets/noSound.png"
import sound from "/src/assets/sound.png"
import sun from "/src/assets/sun.png"
import moon from "/src/assets/moon.png"
import buttonClick from "/src/assets/buttonHover.flac"
import { Howl } from "howler"
import "/src/App.css"

const PuzzleCategories = ({ singlePlayer, twoPlayer }) => {
    const [isActive, setIsActive] = useState(0)
    const [isDarkMode, setIsDarkMode] = useState(getInitialMode())
    const [showAboutMeModal, setShowAboutMeModal] = useState(false)
    const [soundOn, setSoundOn] = useState(true)

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark-mode")
        } else {
            document.body.classList.remove("dark-mode")
        }
    }, [isDarkMode])

    const buttonClickSound = new Howl({
        src: buttonClick,
    })

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
        setIsActive(0)
    }, [])

    useEffect(() => {
        const handleKeyDown = (e) => {
            playSoundEffect()
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                const currentIndex = categoryButtons.findIndex(
                    (button) => button.id === isActive
                )
                let nextIndex

                if (e.key === "ArrowDown") {
                    nextIndex =
                        currentIndex < categoryButtons.length - 1
                            ? currentIndex + 1
                            : currentIndex
                } else if (e.key === "ArrowUp") {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : 0
                }

                setIsActive(categoryButtons[nextIndex].id)
            } else if (e.key === "Enter" && singlePlayer) {
                const currentIndex = categoryButtons.findIndex(
                    (button) => button.id === isActive
                )
                navigate(categoryButtons[currentIndex].nextPageSinglePlayer)
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isActive, categoryButtons, singlePlayer, twoPlayer, navigate, soundOn])

    const handleMouseEnter = (buttonId) => {
        setIsActive(buttonId)
    }

    return (
        <>
            <p className="title" style={{ marginBottom: "50px" }}>
                Choose Puzzle Category
            </p>
            <div className="mainSection">
                <div className="categoryList">
                    {categoryButtons.map((button) => (
                        <Button
                            text={button.text}
                            key={button.id}
                            onClick={() => {
                                if (singlePlayer) {
                                    playSoundEffect()
                                    navigate(button.nextPageSinglePlayer)
                                } else if (twoPlayer) {
                                    playSoundEffect()
                                    navigate(button.nextPageTwoPlayer)
                                } else {
                                    undefined
                                }
                            }}
                            onMouseEnter={() => handleMouseEnter(button.id)}
                            isActive={button.id === isActive}
                        />
                    ))}
                </div>
            </div>
            <div className="footerHome" style={{ marginTop: "60px" }}>
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
            </div>
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

export default PuzzleCategories
