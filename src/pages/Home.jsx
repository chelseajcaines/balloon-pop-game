import stickPerson from "../assets/stickPerson.png"
import stickPeople from "../assets/stickPeople.png"
import HighScore from "../components/HighScore"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import styles from "/src/stylesheets/Home.module.css"

const Home = () => {
    const navigate = useNavigate()

    const [highScore, setHighScore] = useState(0)
    const [singlePlayerButtonActive, setSinglePlayerButtonActive] =
        useState(true)
    const [twoPlayerButtonActive, setTwoPlayerButtonActive] = useState(true)

    useEffect(() => {
        const prevHighScore = localStorage.getItem("HIGH_SCORE_KEY")
        setHighScore(JSON.parse(prevHighScore))
    }, [])

    useEffect(() => {
        setTwoPlayerButtonActive(false)

        const handleKeyPress = (event) => {
            if (event.key === "ArrowRight") {
                setSinglePlayerButtonActive(false)
                setTwoPlayerButtonActive(true)
            } else if (event.key === "ArrowLeft") {
                setSinglePlayerButtonActive(true)
                setTwoPlayerButtonActive(false)
            }
        }
        document.addEventListener("keydown", handleKeyPress)

        return () => {
            document.removeEventListener("keydown", handleKeyPress)
        }
    }, [])

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (
                singlePlayerButtonActive &&
                !twoPlayerButtonActive &&
                event.key === "Enter"
            ) {
                navigate("/SinglePlayerSetup")
            } else if (
                !singlePlayerButtonActive &&
                twoPlayerButtonActive &&
                event.key === "Enter"
            ) {
                navigate("/TwoPlayerSetup")
            }
        }
        document.addEventListener("keydown", handleKeyPress)
        return () => {
            document.removeEventListener("keydown", handleKeyPress)
        }
    }, [singlePlayerButtonActive, twoPlayerButtonActive, navigate])

    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.header}>
                    <h1>Welcome to balloon pop game</h1>
                    <h2>Single Player or Play with a Friend</h2>
                </div>
                <div className={styles.mainSection}>
                    <div className={styles.singlePlayerContainer}>
                        <img src={stickPerson} alt="StickPersonImage" />
                        <button
                            className={
                                singlePlayerButtonActive
                                    ? styles.activeButton
                                    : ""
                            }
                            onClick={() => navigate("/SinglePlayerSetup")}
                        >
                            Single Player
                        </button>
                        <div className={styles.highScore}>
                            <HighScore highScore={highScore} />
                        </div>
                    </div>
                    <div className={styles.twoPlayerContainer}>
                        <img src={stickPeople} alt="StickPeopleImage" />
                        <button
                            className={
                                twoPlayerButtonActive ? styles.activeButton : ""
                            }
                            onClick={() => navigate("/TwoPlayerSetup")}
                        >
                            Two Players
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
