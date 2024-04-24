import { wrongAnswersArray } from "/src/data/const.js"
import { balloons } from "../data/const"
import "/src/App.css"

const WrongGuess = ({ numberOfGuesses, singlePlayer }) => {
    return (
        <>
            {balloons.map((balloon, index) => (
                <div
                    className={
                        singlePlayer
                            ? "singleBalloonSinglePlayer"
                            : "singleBalloon"
                    }
                    key={index}
                >
                    {wrongAnswersArray[index] && numberOfGuesses > index ? (
                        <img
                            src={wrongAnswersArray[index].src}
                            alt={wrongAnswersArray[index].alt}
                            className={wrongAnswersArray[index].classname}
                        />
                    ) : (
                        <img
                            src={balloon.src}
                            alt={balloon.alt}
                            className={balloon.classname}
                        />
                    )}
                </div>
            ))}
        </>
    )
}

export default WrongGuess
