import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { categoryButtons } from "../data/const"
import Button from "/src/components/Button"

const PuzzleCategories = ({ singlePlayer, twoPlayer }) => {
    const [isActive, setIsActive] = useState(0)

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const playerName = params.get("name")

    const navigate = useNavigate()

    useEffect(() => {
        setIsActive(0)
    }, [])

    useEffect(() => {
        const handleKeyDown = (e) => {
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
                navigate(`/SinglePlayer/MovieTitles?name=${playerName}`)
            } else if (e.key === "Enter" && twoPlayer) {
                const currentIndex = categoryButtons.findIndex(
                    (button) => button.id === isActive
                )
                navigate("/TwoPlayer/MovieTitles")
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [isActive, categoryButtons, singlePlayer, twoPlayer, navigate])

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
                        {categoryButtons.map((button) => (
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
