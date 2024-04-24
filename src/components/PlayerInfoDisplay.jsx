import { useState, useEffect } from "react"
import crown from "/src/assets/crown.png"
import "/src/App.css"

const PlayerInfoDisplay = ({
    singlePlayer,
    playerOne,
    playerTwo,
    score,
    playerName,
    playerOneScore,
    playerTwoScore,
}) => {
    const [selectedAvatar, setSelectedAvatar] = useState("")
    const [selectedAvatarOne, setSelectedAvatarOne] = useState("")
    const [selectedAvatarTwo, setSelectedAvatarTwo] = useState("")
    const [playerNameOne, setPlayerNameOne] = useState("")
    const [playerNameTwo, setPlayerNameTwo] = useState("")

    useEffect(() => {
        const data = window.localStorage.getItem("AVATAR_KEY")
        setSelectedAvatar(JSON.parse(data))
    }, [])

    useEffect(() => {
        const data = window.localStorage.getItem("PLAYER_ONE_AVATAR_KEY")
        setSelectedAvatarOne(JSON.parse(data))
    }, [])

    useEffect(() => {
        const data = window.localStorage.getItem("PLAYER_TWO_AVATAR_KEY")
        setSelectedAvatarTwo(JSON.parse(data))
    }, [])

    useEffect(() => {
        const data = window.localStorage.getItem("PLAYER_ONE_NAME_KEY")
        setPlayerNameOne(JSON.parse(data))
    }, [])

    useEffect(() => {
        const data = window.localStorage.getItem("PLAYER_TWO_NAME_KEY")
        setPlayerNameTwo(JSON.parse(data))
    }, [])

    return (
        <>
            <div
                className={singlePlayer ? "playerInfo" : "playerInfoTwoPlayer"}
            >
                {playerOne && (
                    <div className="playerCrown">
                        {playerOneScore > playerTwoScore && (
                            <img src={crown} alt="crown" className="crown" />
                        )}
                    </div>
                )}
                {playerTwo && (
                    <div className="playerCrown">
                        {playerTwoScore > playerOneScore && (
                            <img src={crown} alt="crown" className="crown" />
                        )}
                    </div>
                )}
                <div
                    className={
                        singlePlayer ? "playerAvatar" : "playerAvatarTwoPlayer"
                    }
                >
                    {singlePlayer && (
                        <img
                            src={selectedAvatar.src}
                            alt={selectedAvatar.alt}
                            className="playerAvatarImage"
                        />
                    )}
                    {playerOne && (
                        <img
                            src={selectedAvatarOne.src}
                            alt={selectedAvatarOne.alt}
                            className="playerAvatarImage"
                        />
                    )}
                    {playerTwo && (
                        <img
                            src={selectedAvatarTwo.src}
                            alt={selectedAvatarTwo.alt}
                            className="playerAvatarImage"
                        />
                    )}
                </div>
                <div
                    className={
                        singlePlayer ? "playerName" : "playerNameTwoPlayer"
                    }
                >
                    {singlePlayer && (
                        <p className="singlePlayerName">{playerName}</p>
                    )}
                    {playerOne && (
                        <p className="playerNameOneTwo">
                            Player One: {playerNameOne}
                        </p>
                    )}
                    {playerTwo && (
                        <p className="playerNameOneTwo">
                            Player Two: {playerNameTwo}
                        </p>
                    )}
                </div>
                <div
                    className={
                        singlePlayer ? "playerScore" : "playerScoreTwoPlayer"
                    }
                >
                    Points: {score}
                </div>
            </div>
        </>
    )
}

export default PlayerInfoDisplay
