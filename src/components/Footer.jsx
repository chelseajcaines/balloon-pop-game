import Button from "/src/components/Button"
import { useState } from "react"

const Footer = ({ handleQuit, handleNextPuzzle }) => {
    const [isActive, setIsActive] = useState(0)

    const footerButtons = [
        {
            id: 0,
            text: "Back to home page",
            onClick: handleQuit,
        },
        {
            id: 1,
            text: "Next Puzzle",
            onClick: handleNextPuzzle,
        },
    ]

    const handleMouseEnter = (buttonId) => {
        setIsActive(buttonId)
    }

    const handleMouseLeave = () => {
        setIsActive("")
    }

    return (
        <>
            <div className="footerButtons">
                {footerButtons.map((button) => (
                    <Button
                        key={button.id}
                        text={button.text}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        isActive={button.id === isActive}
                        onClick={button.onClick}
                    />
                ))}
            </div>
            <div className="footerButtonKeyCommands">
                <p>Ctrl + B</p>
                <p>Ctrl + Q</p>
            </div>
        </>
    )
}

export default Footer
