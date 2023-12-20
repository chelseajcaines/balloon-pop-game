import stickPerson from "../assets/stickPerson.png"
import { useNavigate } from "react-router-dom"

const Button = () => {
    const navigate = useNavigate()
    return <button onClick={() => navigate("/choose-opponent")}>Play</button>
}

const Home = () => {
    return (
        <>
            <h1>Balloon Pop Game</h1>
            <img src={stickPerson} />
            <Button />
        </>
    )
}

export default Home
