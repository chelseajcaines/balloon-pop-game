import Button from "/src/components/Button"
import { useState } from "react"

const Footer = ({ handleQuit, handleNextPuzzle }) => {
    const [isActiveQuit, setIsActiveQuit] = useState(false)
    const [isActiveNextPuzzle, setIsActiveNextPuzzle] = useState(false)
    return (
        <>
            <div className="footerButtonsContainer">
                <Button
                    text="Back to home page"
                    onClick={handleQuit}
                    isActive={isActiveQuit}
                    onMouseEnter={() => setIsActiveQuit(true)}
                    onMouseLeave={() => setIsActiveQuit(false)}
                />
                <Button
                    text="Next Puzzle"
                    onClick={handleNextPuzzle}
                    isActive={isActiveNextPuzzle}
                    onMouseEnter={() => setIsActiveNextPuzzle(true)}
                    onMouseLeave={() => setIsActiveNextPuzzle(false)}
                />
            </div>
            <div className="footerButtonKeyCommands">
                <p>Ctrl + B</p>
                <p>Ctrl + Q</p>
            </div>
        </>
    )
}

export default Footer
