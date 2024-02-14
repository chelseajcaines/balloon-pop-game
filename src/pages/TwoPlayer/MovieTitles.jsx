import "/src/App.css"
import { useLocation } from "react-router-dom"

import { useState, useEffect } from "react"
//import WrongGuess from "../../components/WrongGuess"
//import WordPuzzle from "../../components/WordPuzzle"

const TwoPlayerMovieTitles = () => {
    const location = useLocation()

    const params = new URLSearchParams(location.search)
    const playerNameOne = params.get("PlayerOneName")
    const playerNameTwo = params.get("PlayerTwoName")

    const [selectedAvatarOne, setSelectedAvatarOne] = useState("")

    useEffect(() => {
        const data = window.localStorage.getItem("PLAYER_ONE_AVATAR_KEY")
        setSelectedAvatarOne(JSON.parse(data))
    }, [])

    return (
        <>
            <div className="pageContainer">
                <h1>Two Player Game Play</h1>
                <div className="playerInfoTP">
                    <div className="playerOneInfo">
                        <div className="playerOneAvatar">
                            {selectedAvatarOne && (
                                <img
                                    src={selectedAvatarOne.src}
                                    alt={selectedAvatarOne.alt}
                                />
                            )}
                        </div>
                        <div className="playerOneName">
                            Player 1 Name: {playerNameOne}
                        </div>
                        <div className="playerOneScore">Player 1 Score</div>
                    </div>
                    <div className="playerTwoInfo">
                        <div className="playerTwoAvatar">Player 2 Avatar</div>
                        <div className="playerTwoName">
                            Player 2 Name: {playerNameTwo}
                        </div>
                        <div className="playerTwoScore">Player 2 Score</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TwoPlayerMovieTitles
