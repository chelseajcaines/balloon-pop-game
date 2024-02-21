import { useState, useEffect } from "react"

const PlayerInfoDisplay = ({
    singlePlayer,
    playerOne,
    playerTwo,
    score,
    playerName,
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
            <div className="playerInfo">
                <div className="playerAvatar">
                    {singlePlayer && (
                        <img
                            src={selectedAvatar.src}
                            alt={selectedAvatar.alt}
                        />
                    )}
                    {playerOne && (
                        <img
                            src={selectedAvatarOne.src}
                            alt={selectedAvatarOne.alt}
                        />
                    )}
                    {playerTwo && (
                        <img
                            src={selectedAvatarTwo.src}
                            alt={selectedAvatarTwo.alt}
                        />
                    )}
                </div>
                <div className="playerName">
                    {singlePlayer && <p>{playerName}</p>}
                    {playerOne && <p>Player One: {playerNameOne}</p>}
                    {playerTwo && <p>Player Two: {playerNameTwo}</p>}
                </div>
                <div className="playerScore">Current Score: {score}</div>
            </div>
        </>
    )
}

export default PlayerInfoDisplay
