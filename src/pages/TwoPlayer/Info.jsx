import "/src/App.css"
import PlayerInfo from "../../components/PlayerInfo"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const TwoPlayerSetup = () => {
    const [playerOneReady, setPlayerOneReady] = useState(false)
    const [playerTwoReady, setPlayerTwoReady] = useState(false)

    const navigate = useNavigate()

    return (
        <>
            <div className="pageContainer">
                <h1 className="header">Two Player Setup</h1>
                <div className="playerContainers">
                    <PlayerInfo
                        playerOne={true}
                        onClick={() => setPlayerOneReady(true)}
                    />
                    <PlayerInfo
                        playerTwo={true}
                        onClick={() => setPlayerTwoReady(true)}
                    />
                </div>
                <div className="footerPlayButton">
                    <Button
                        text="Start"
                        isActive={playerOneReady && playerTwoReady}
                        onClick={
                            playerOneReady && playerTwoReady
                                ? () => navigate("/TwoPlayer/Categories/")
                                : undefined
                        }
                    />
                </div>
            </div>
        </>
    )
}

export default TwoPlayerSetup
