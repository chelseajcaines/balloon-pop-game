import SinglePlayerGamePlay from "../../components/SinglePlayerGamePlay"
import "/src/App.css"

const SinglePlayerFood = () => {
    return (
        <>
            <div className="pageContainer">
                <SinglePlayerGamePlay food={true} text={"Food"} />
            </div>
        </>
    )
}

export default SinglePlayerFood
