import SinglePlayerGamePlay from "../../components/SinglePlayerGamePlay"
import "/src/App.css"

const SinglePlayerBrands = () => {
    return (
        <>
            <div className="pageContainer">
                <SinglePlayerGamePlay brands={true} text={"Brand Names"} />
            </div>
        </>
    )
}

export default SinglePlayerBrands
