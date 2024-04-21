import Button from "/src/components/Button"
import { useState } from "react"
import "/src/App.css"

const Footer = ({ handleQuit, handleNextPuzzle }) => {
    const [isActiveQuit, setIsActiveQuit] = useState(false)
    const [isActiveNextPuzzle, setIsActiveNextPuzzle] = useState(false)

    return (
        <>
            <div className="footerButtonsContainer">
                <div className="buttonWrapper">
                    <Button
                        text="Home"
                        onClick={handleQuit}
                        isActive={isActiveQuit}
                        onMouseEnter={() => setIsActiveQuit(true)}
                        onMouseLeave={() => setIsActiveQuit(false)}
                    />
                </div>

                <div className="buttonWrapper">
                    <Button
                        text="Next Puzzle"
                        onClick={handleNextPuzzle}
                        isActive={isActiveNextPuzzle}
                        onMouseEnter={() => setIsActiveNextPuzzle(true)}
                        onMouseLeave={() => setIsActiveNextPuzzle(false)}
                    />
                </div>
            </div>
            <div className="footerButtonKeyCommands">
                <p>Ctrl + B</p>
                <p>Ctrl + Q</p>
            </div>
        </>
    )
}

export default Footer
