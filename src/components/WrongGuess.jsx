import { wrongAnswersArray } from "../data/const.js"

const WrongGuess = ({ numberOfGuesses }) => {
    return <div>{wrongAnswersArray.slice(0, numberOfGuesses).join(", ")}</div>
}

export default WrongGuess
