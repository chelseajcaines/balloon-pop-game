import PlayerAvatar from "/src/components/PlayerAvatar"
import ChooseLetter from "/src/components/Choose-letter"
import PlayerName from "/src/components/PlayerName"
import MovieTitleFetcher from "../components/MovieTitleFetcher"

const SinglePlayerGamePlay = () => {
    return (
        <>
            <h1>Single Player - Game play</h1>

            <PlayerAvatar />
            <PlayerName />
            <MovieTitleFetcher />
            <ChooseLetter />
        </>
    )
}

export default SinglePlayerGamePlay
