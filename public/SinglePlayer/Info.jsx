import PlayerInfo from "/PlayerInfo.jsx"
import title from "/src/assets/title.png"
import "/src/App.css"

const SinglePlayerSetup = () => {
    return (
        <>
            <div className="pageContainer">
                <div className="header">
                    <img src={title} alt="Balloon Pop" className="titleImage" />
                </div>
                <PlayerInfo singlePlayer={true} />
            </div>
        </>
    )
}

export default SinglePlayerSetup
