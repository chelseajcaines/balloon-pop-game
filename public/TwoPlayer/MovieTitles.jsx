import "/src/App.css"
import TwoPlayerGamePlay from "../../components/TwoPlayerGamePlay"

const TwoPlayerMovieTitles = () => {
    return (
        <>
            <div className="pageContainer">
                <TwoPlayerGamePlay movieTitles={true} text="Movie Titles" />
            </div>
        </>
    )
}

export default TwoPlayerMovieTitles
