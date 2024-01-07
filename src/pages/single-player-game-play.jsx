import { useLocation } from "react-router-dom"
import PlayerAvatar from "/src/components/PlayerAvatar"
import ChooseLetter from "/src/components/Choose-letter"
import MovieTitleFetcher from "../components/MovieTitleFetcher"

const SinglePlayerGamePlay = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const playerName = params.get("name")

    return (
        <>
            <h1>Single Player - Game play</h1>
            <PlayerAvatar />
            <p>Player Name: {playerName}</p>
            <MovieTitleFetcher />
            <ChooseLetter />
        </>
    )
}

export default SinglePlayerGamePlay
