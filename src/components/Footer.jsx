import Button from "/src/components/Button"
import { useState } from "react"

const Footer = ({
    handleQuit,
    handleNextPuzzle,
    singlePlayer,
    handleShowLeaderboard,
}) => {
    const [isActiveQuit, setIsActiveQuit] = useState(false)
    const [isActiveNextPuzzle, setIsActiveNextPuzzle] = useState(false)
    const [isActiveTopTen, setIsActiveTopTen] = useState(false)
    return (
        <>
            <div
                className={
                    singlePlayer
                        ? "singlePlayerFooterButtonsContainer"
                        : "footerButtonsContainer"
                }
            >
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
                {singlePlayer && (
                    <Button
                        text="Top 10"
                        onClick={handleShowLeaderboard}
                        isActive={isActiveTopTen}
                        onMouseEnter={() => setIsActiveTopTen(true)}
                        onMouseLeave={() => setIsActiveTopTen(false)}
                    />
                )}
            </div>
            <div
                className={
                    singlePlayer
                        ? "singlePlayerFooterButtonKeyCommands"
                        : "footerButtonKeyCommands"
                }
            >
                <p>Ctrl + B</p>
                <p>Ctrl + Q</p>
                {singlePlayer && <p>Ctrl + Y</p>}
            </div>
        </>
    )
}

export default Footer
