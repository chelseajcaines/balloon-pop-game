import stickPerson from "../assets/stickPerson.png"
import stickPeople from "../assets/stickPeople.png"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"

import styles from "/src/stylesheets/Home.module.css"

const Home = () => {
    const navigate = useNavigate()

    return (
        <div>
            <div className={styles.pageContainer}>
                <h1>BALLOON POP</h1>

                <div className={styles.mainContainer}>
                    <div className={styles.playerModeContainer}>
                        <img src={stickPerson} alt="StickPersonImage" />
                        <Button
                            text="Single Player"
                            onClick={() => navigate("/SinglePlayer/Info")}
                            className={styles.button}
                        />
                    </div>
                    <div className={styles.playerModeContainer}>
                        <img src={stickPeople} alt="StickPeopleImage" />
                        <Button
                            text="Single Player"
                            onClick={() => navigate("/TwoPlayer/Info")}
                            className={styles.button}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
