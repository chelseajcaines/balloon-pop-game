import "/src/App.css"
import TwoPlayerGamePlay from "../../components/TwoPlayerGamePlay"

const TwoPlayerFood = () => {
    return (
        <>
            <div className="pageContainer">
                <TwoPlayerGamePlay food={true} text="Food" />
            </div>
        </>
    )
}

export default TwoPlayerFood
