import stickPerson from "../assets/stickPerson.png"
import stickPeople from "../assets/stickPeople.png"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from "/src/stylesheets/Home.module.css"

const Home = () => {
    const navigate = useNavigate()

    const [isActive, setIsActive] = useState(0)

    const buttons = [
        {
            id: 0,
            text: "Single Player",
            nextPage: "/SinglePlayer/Info",
        },
        {
            id: 1,
            text: "Two Player",
            nextPage: "/TwoPlayer/Info",
        },
    ]

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                const currentIndex = buttons.findIndex(
                    (button) => button.id === isActive
                )
                let nextIndex

                if (e.key === "ArrowRight") {
                    nextIndex =
                        currentIndex < buttons.length - 1
                            ? currentIndex + 1
                            : currentIndex
                } else if (e.key === "ArrowLeft") {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : 0
                }

                setIsActive(buttons[nextIndex].id)
            } else if (e.key === "Enter") {
                const currentIndex = buttons.findIndex(
                    (button) => button.id === isActive
                )
                navigate(buttons[currentIndex].nextPage)
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isActive, buttons, navigate])

    const handleMouseEnter = (buttonId) => {
        setIsActive(buttonId)
    }

    const handleMouseLeave = () => {}

    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.header}>
                    <h1>Welcome to balloon pop game</h1>
                    <h2>Single Player or Play with a Friend</h2>
                </div>
                <div className={styles.modeImageContainer}>
                    <img src={stickPerson} alt="StickPersonImage" />
                    <img src={stickPeople} alt="StickPeopleImage" />
                </div>
                <div className={styles.buttonsContainer}>
                    {buttons.map((button) => (
                        <button
                            key={button.id}
                            onMouseEnter={() => handleMouseEnter(button.id)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => navigate(button.nextPage)}
                            className={
                                button.id === isActive
                                    ? styles.activeButton
                                    : ""
                            }
                        >
                            {button.text}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
