import "/src/App.css"
import PlayerInfoDisplay from "../../components/PlayerInfoDisplay"

const TwoPlayerMovieTitles = () => {
    return (
        <>
            <div className="pageContainer">
                <h1>Two Player Game Play</h1>
                <div className="playerInfo">
                    <PlayerInfoDisplay playerOne={true} />
                    <PlayerInfoDisplay playerTwo={true} />
                </div>
            </div>
        </>
    )
}

export default TwoPlayerMovieTitles
