import stickPerson from "../assets/stickPerson.png"
import { useNavigate } from "react-router-dom"

const Home = () => {
    return (
        <>
            <h1>Balloon Pop Game</h1>
            <StickPersonImage />
            <PlayButton />
        </>
    )
}

const PlayButton = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/opponent")
    }

    return <Button onClick={handleClick} />
}

const Button = ({ onClick }) => {
    return <button onClick={onClick}>Play</button>
}

const StickPersonImage = () => {
    return <img src={stickPerson} />
}

export default Home
