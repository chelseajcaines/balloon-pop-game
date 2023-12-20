import bot from "../assets/bot.png"
import human from "../assets/human.png"
import { useNavigate } from "react-router-dom"

const Image = ({ src }) => {
    return <img src={src} />
}

const Button = ({ onClick, title }) => {
    return <button onClick={onClick}>{title}</button>
}

const ComputerButton = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/computer-player-info")
    }
    return <Button onClick={handleClick} title="Computer" />
}

const HumanButton = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/human-player-info")
    }
    return <Button onClick={handleClick} title="Human" />
}

const ChooseOpponent = () => {
    return (
        <>
            <h1>Choose Your Opponent</h1>
            <Image src={bot} />
            <ComputerButton />
            <Image src={human} />
            <HumanButton />
        </>
    )
}

export default ChooseOpponent
