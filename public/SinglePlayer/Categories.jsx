import PuzzleCategories from "../../components/PuzzleCategories"
import title from "/src/assets/title.png"
import "/src/App.css"

const SinglePlayerCategories = () => {
    return (
        <>
            <div className="pageContainer">
                <div className="header">
                    <img src={title} alt="Balloon Pop" className="titleImage" />
                </div>
                <PuzzleCategories singlePlayer={true} />
            </div>
        </>
    )
}

export default SinglePlayerCategories
