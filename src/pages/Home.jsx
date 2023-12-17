import stickPerson from "../assets/stickPerson.png"
import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate()
    return (
        <>
            <h1>Balloon Pop Game</h1>
            <img src={stickPerson} />
            <button onClick={() => navigate("/choose-opponent")}>Play</button>
        </>
    )
}
