import styles from "/src/stylesheets/Keyboard.module.css"
import { alphabetArray } from "../data/const.js"

const Keyboard = ({
    activeLetters,
    inactiveLetters,
    onLetterClick,
    disabled = false,
}) => {
    return (
        <div>
            {alphabetArray.map((letter) => {
                const isActive = activeLetters.includes(letter)
                const isInactive = inactiveLetters.includes(letter)
                return (
                    <div key={letter} style={{ display: "inline-block" }}>
                        <button
                            onClick={() => onLetterClick(letter)}
                            className={`${styles.btn} ${
                                isActive ? styles.active : ""
                            }
                    ${isInactive ? styles.inactive : ""}`}
                            disabled={isActive || isInactive || disabled}
                        >
                            {letter}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default Keyboard
