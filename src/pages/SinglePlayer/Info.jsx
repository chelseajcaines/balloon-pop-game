import PlayerInfo from "../../components/PlayerInfo"
import "/src/App.css"

const SinglePlayerSetup = () => {
    return (
        <>
            <div className="pageContainer">
                <div className="header">
                    <h1>Single Player Setup</h1>
                </div>
                <PlayerInfo singlePlayer={true} />
            </div>
        </>
    )
}

export default SinglePlayerSetup
