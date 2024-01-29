import styles from "/src/stylesheets/TwoPlayerGamePlay.module.css"
import WrongGuess from "../../components/WrongGuess"
import WordPuzzle from "../../components/WordPuzzle"

const TwoPlayerMovieTitles = () => {
    return (
        <>
            <div className={styles.pageContainer}>
                <h1>Two Player Game Play</h1>
                <div className={styles.playerInfo}>
                    <div className={styles.playerOneInfo}>
                        <div className={styles.playerOneAvatar}>
                            Player 1 Avatar
                        </div>
                        <div className={styles.playerOneName}>
                            Player 1 Name
                        </div>
                        <div className={styles.playerOneScore}>
                            Player 1 Score
                        </div>
                    </div>
                    <div className={styles.playerTwoInfo}>
                        <div className={styles.playerTwoAvatar}>
                            Player 2 Avatar
                        </div>
                        <div className={styles.playerTwoName}>
                            Player 2 Name
                        </div>
                        <div className={styles.playerTwoScore}>
                            Player 2 Score
                        </div>
                    </div>
                </div>
                <div className={styles.wrongGuessContainer}>
                    <WrongGuess />
                </div>
                <div className={styles.puzzleContainer}>
                    <WordPuzzle />
                </div>
                <div>
                    <FetchStatusMessage />
                </div>
                <div style={{ paddingTop: "10px" }}>
                    <Keyboard />
                </div>
                <div className={styles.footer}>
                    <div style={{ display: "block" }}>
                        <button>Back to home page</button>
                        <p>Ctrl + B</p>
                    </div>
                    <div style={{ display: "block" }}>
                        <button>Next Puzzle</button>
                        <p>Ctrl + Q</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TwoPlayerMovieTitles
