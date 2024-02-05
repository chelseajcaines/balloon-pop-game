import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import balloon from "/src/assets/balloon.png"
import twoBalloons from "/src/assets/twoBalloons.png"
import styles from "/src/stylesheets/Home.module.css"
import Button from "/src/components/Button"

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

    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.header}>
                    <h1>BALLOON POP</h1>
                </div>
                <div className={styles.imagesContainer}>
                    <div className={styles.imageContainer}>
                        <img
                            src={balloon}
                            alt="balloon"
                            className={styles.balloon}
                            style={{ marginRight: "80px", marginTop: "30px" }}
                        />
                    </div>
                    <div className={styles.imageContainer}>
                        <img
                            src={twoBalloons}
                            alt="twoBalloons"
                            className={styles.balloon}
                        />
                    </div>
                </div>
                <div className={styles.buttonsContainer}>
                    {buttons.map((button) => (
                        <Button
                            key={button.id}
                            text={button.text}
                            nextPage={button.nextPage}
                            isActive={button.id === isActive}
                            onMouseEnter={() => handleMouseEnter(button.id)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home
