import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import Button from "/src/components/Button"

const PuzzleCategories = ({ singlePlayer, twoPlayer }) => {
    const [isActive, setIsActive] = useState(0)

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const playerName = params.get("name")

    const navigate = useNavigate()

    const buttons = [
        {
            id: 0,
            text: "Movie Titles",
        },
        {
            id: 1,
            text: "Button 2",
            //singlePlayerGame:
            //twoPlayerGame:
        },
        {
            id: 2,
            text: "Button 3",
            //singlePlayerGame:
            //twoPlayerGame:
        },
        {
            id: 3,
            text: "Button 4",
            //singlePlayerGame:
            //twoPlayerGame:
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
            <div className="pageContainer">
                <div className="header">
                    <h1>Choose Puzzle Category</h1>
                </div>
                <div className="mainSection">
                    <div className="categoryList">
                        {buttons.map((button) => (
                            <Button
                                text={button.text}
                                key={button.id}
                                onClick={
                                    singlePlayer
                                        ? () =>
                                              navigate(
                                                  `/SinglePlayer/MovieTitles?name=${playerName}`
                                              )
                                        : twoPlayer
                                        ? () =>
                                              navigate("/TwoPlayer/MovieTitles")
                                        : undefined
                                }
                                onMouseEnter={() => handleMouseEnter(button.id)}
                                isActive={button.id === isActive}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default PuzzleCategories
