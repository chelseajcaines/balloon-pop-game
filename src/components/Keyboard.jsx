import styles from "/src/stylesheets/Keyboard.module.css"
import { alphabetArray } from "../data/const.js"

const Keyboard = ({
    activeLetters,
    inactiveLetters,
    onLetterClick,
    disabled = false,
}) => {
    const rows = [
        alphabetArray.slice(0, 10),
        alphabetArray.slice(10, 19),
        alphabetArray.slice(19),
    ]

    // <div ontouchstart="">
    //     <div class="button">
    //         <a href="#">Mobile First</a>
    //     </div>
    // </div>

    return (
        <div className={styles.keyboard}>
            {rows.map((row, index) => (
                <div key={index} className={styles.row}>
                    {row.map((letter) => {
                        const isActive = activeLetters.includes(letter)
                        const isInactive = inactiveLetters.includes(letter)
                        return (
                            <button
                                key={letter}
                                onClick={() => onLetterClick(letter)}
                                className={`${styles.btn} ${
                                    isActive ? styles.active : ""
                                } ${isInactive ? styles.inactive : ""}`}
                                disabled={isActive || isInactive || disabled}
                            >
                                {letter}
                            </button>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

export default Keyboard
