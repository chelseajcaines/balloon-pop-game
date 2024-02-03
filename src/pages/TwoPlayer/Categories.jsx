import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

import styles from "/src/stylesheets/Categories.module.css"

const TwoPlayerCategories = () => {
    const [isActive, setIsActive] = useState(0)

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const playerNameOne = params.get("PlayerOneName")
    const playerNameTwo = params.get("PlayerTwoName")

    const navigate = useNavigate()

    const buttons = [
        {
            id: 0,
            text: "Movie Titles",
            nextPage: `/TwoPlayer/MovieTitles?PlayerOneName=${playerNameOne}&PlayerTwoName=${playerNameTwo}`,
        },
        {
            id: 1,
            text: "Button 2",
            //nextPage:
        },
        {
            id: 2,
            text: "Button 3",
            //nextPage:
        },
        {
            id: 3,
            text: "Button 4",
            //nextPage:
        },
    ]

    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.header}>
                    <h1>Choose Puzzle Category</h1>
                    <div className={styles.categoryList}>
                        {buttons.map((button) => (
                            <button
                                key={button.id}
                                onClick={() => navigate(button.nextPage)}
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

export default TwoPlayerCategories
