import "/src/App.css"
import PlayerInfo from "../../components/PlayerInfo"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

const TwoPlayerSetup = () => {
    const [playerTwoDisbaled, setPlayerTwoDisbaled] = useState(true)
    const [playerOneDisabled, setPlayerOneDisabled] = useState(false)
    const [bothPlayersDisabled, setBothPlayersDisabled] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        setBothPlayersDisabled(false)
        setPlayerTwoDisbaled(true)
    }, [])

    const handleNextPlayer = () => {
        setPlayerTwoDisbaled(false)
        setPlayerOneDisabled(true)
    }

    const handleBothPlayers = () => {
        setPlayerTwoDisbaled(true)
        setBothPlayersDisabled(true)
    }

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter" && bothPlayersDisabled) {
                navigate("/TwoPlayer/Categories/")
            }
        }

        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [bothPlayersDisabled, navigate])

    return (
        <>
            <div className="pageContainer">
                <h1 className="header">Two Player Setup</h1>
                <div className="playerContainers">
                    <PlayerInfo
                        playerOne={true}
                        playerDisabled={playerOneDisabled}
                        onClick={handleNextPlayer}
                        setPlayerOneReady={handleNextPlayer}
                    />
                    <PlayerInfo
                        playerTwo={true}
                        playerDisabled={playerTwoDisbaled}
                        onClick={handleBothPlayers}
                        setPlayerTwoReady={handleBothPlayers}
                    />
                </div>
                <div className="footerPlayButton">
                    <Button
                        text="Start"
                        bothPlayersDisabled={bothPlayersDisabled}
                        onClick={
                            bothPlayersDisabled
                                ? () => navigate("/TwoPlayer/Categories/")
                                : undefined
                        }
                        isActive={bothPlayersDisabled}
                    />
                </div>
            </div>
        </>
    )
}

export default TwoPlayerSetup
