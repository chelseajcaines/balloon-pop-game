import "/src/App.css"
import TwoPlayerGamePlay from "../../components/TwoPlayerGamePlay"

const TwoPlayerBrands = () => {
    return (
        <>
            <div className="pageContainer">
                <TwoPlayerGamePlay brands={true} text="Brands" />
            </div>
        </>
    )
}

export default TwoPlayerBrands
