import bot from "../assets/bot.png"
import human from "../assets/human.png"
import { useNavigate } from "react-router-dom"

export default function Opponents() {
    const navigate = useNavigate()
    return (
        <>
            <h1>Choose Your Opponent</h1>
            <img src={bot} />
            <button onClick={() => navigate("/computer")}>Computer</button>
            <img src={human} />
            <button onClick={() => navigate("/human")}>Human</button>
        </>
    )
}
