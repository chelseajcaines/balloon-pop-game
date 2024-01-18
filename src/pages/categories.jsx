import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from "/src/stylesheets/Categories.module.css"

const Categories = () => {
    const [isActive, setIsActive] = useState(0)

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const playerName = params.get("name")

    const navigate = useNavigate()

    const buttons = [
        {
            id: 0,
            text: "Movie Titles",
            onClick: () => navigate(`/SinglePlayerGamePlay?name=${playerName}`),
        },
        {
            id: 1,
            text: "Button 2",
            //onClick:
        },
        {
            id: 2,
            text: "Button 3",
            //onClick:
        },
    ]

    useEffect(() => {
        setIsActive(0)
    }, [])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                const currentIndex = buttons.findIndex(
                    (button) => button.id === isActive
                )
                let nextIndex

                if (e.key === "ArrowDown") {
                    nextIndex =
                        currentIndex < buttons.length - 1
                            ? currentIndex + 1
                            : currentIndex
                } else if (e.key === "ArrowUp") {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : 0
                }

                setIsActive(buttons[nextIndex].id)
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isActive, buttons])

    const handleMouseEnter = (buttonId) => {
        setIsActive(buttonId)
    }

    const handleMouseLeave = () => {}

    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.header}>
                    <h1>Choose Puzzle Category</h1>
                    <div className={styles.categoryList}>
                        {buttons.map((button) => (
                            <button
                                key={button.id}
                                onClick={button.onClick}
                                onMouseEnter={() => handleMouseEnter(button.id)}
                                onMouseLeave={handleMouseLeave}
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
            </div>
        </>
    )
}

export default Categories
