import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import balloon from "/src/assets/balloon.png"
import twoBalloons from "/src/assets/twoBalloons.png"
import "/src/App.css"
import Button from "/src/components/Button"

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

const Home = () => {
    const navigate = useNavigate()

    const [isActive, setIsActive] = useState(0)

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
    }, [isActive, navigate])

    const handleMouseEnter = (buttonId) => {
        setIsActive(buttonId)
    }

    return (
        <>
            <div className="pageContainer">
                <div className="header">
                    <h1>BALLOON POP</h1>
                </div>
                <div className="imagesContainer">
                    <div className="imageContainer">
                        <img
                            src={balloon}
                            alt="balloon"
                            className="balloon"
                            style={{ marginRight: "80px", marginTop: "30px" }}
                        />
                    </div>
                    <div className="imageContainer">
                        <img
                            src={twoBalloons}
                            alt="twoBalloons"
                            className="balloon"
                        />
                    </div>
                </div>
                <div className="buttonsContainer">
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
