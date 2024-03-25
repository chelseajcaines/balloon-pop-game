import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { homeButtons } from "../data/const"
import balloon from "/src/assets/balloon.png"
import twoBalloons from "/src/assets/twoBalloons.png"
import title from "/src/assets/title.png"
import Button from "/src/components/Button"
import "/src/App.css"

const Home = () => {
    const navigate = useNavigate()

    const [isActive, setIsActive] = useState(0)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                const currentIndex = homeButtons.findIndex(
                    (button) => button.id === isActive
                )
                let nextIndex

                if (e.key === "ArrowRight") {
                    nextIndex =
                        currentIndex < homeButtons.length - 1
                            ? currentIndex + 1
                            : currentIndex
                } else if (e.key === "ArrowLeft") {
                    nextIndex = currentIndex > 0 ? currentIndex - 1 : 0
                }

                setIsActive(homeButtons[nextIndex].id)
            } else if (e.key === "Enter") {
                const currentIndex = homeButtons.findIndex(
                    (button) => button.id === isActive
                )
                navigate(homeButtons[currentIndex].nextPage)
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
                    <img
                        src={title}
                        alt="Balloon Pop"
                        className="titleImageHome"
                    />
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
                    {homeButtons.map((button) => (
                        <Button
                            key={button.id}
                            text={button.text}
                            onClick={() => navigate(button.nextPage)}
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
