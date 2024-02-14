import PlayerInfo from "../../components/PlayerInfo"
import "/src/App.css"

const SinglePlayerSetup = () => {
    return (
        <>
            <div className="pageContainer">
                <div className="header">
                    <h1>Single Player Setup</h1>
                </div>
                <PlayerInfo />
            </div>
        </>
    )
}

export default SinglePlayerSetup
