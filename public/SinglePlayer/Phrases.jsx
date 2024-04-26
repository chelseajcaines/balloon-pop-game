import SinglePlayerGamePlay from "../SinglePlayerGamePlay"
import "/src/App.css"

const SinglePlayerPhrases = () => {
    return (
        <>
            <div className="pageContainer">
                <SinglePlayerGamePlay phrases={true} text={"Phrases"} />
            </div>
        </>
    )
}

export default SinglePlayerPhrases
