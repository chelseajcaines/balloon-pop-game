import PlayerInfo from "../../components/PlayerInfo"

import "/src/App.css"

const SinglePlayerSetup = () => {
    // localStorage.setItem("AVATAR_KEY", JSON.stringify(selectedAvatar))
    // navigate(`/SinglePlayer/Categories?name=${inputValue}`)

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
