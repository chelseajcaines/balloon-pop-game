import bot from "../assets/bot.png"
import human from "../assets/human.png"
import { useNavigate } from "react-router-dom"

const ComputerButton = () => {
    const navigate = useNavigate()
    return (
        <button onClick={() => navigate("/computer-player-info")}>
            Computer
        </button>
    )
}

const HumanButton = () => {
    const navigate = useNavigate()
    return <button onClick={() => navigate("/human-player-info")}>Human</button>
}

const ChooseOpponent = () => {
    return (
        <>
            <h1>Choose Your Opponent</h1>
            <img src={bot} />
            <ComputerButton />
            <img src={human} />
            <HumanButton />
        </>
    )
}

export default ChooseOpponent
