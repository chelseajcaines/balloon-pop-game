import stickPerson from "../assets/stickPerson.png"
import { useNavigate } from "react-router-dom"

const Button = ({ onClick, title }) => {
    return <button onClick={onClick}>{title}</button>
}

const PlayButton = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/opponent")
    }

    return <Button onClick={handleClick} title="Play" />
}

const StickPersonImage = () => {
    return <img src={stickPerson} />
}

const Home = () => {
    return (
        <>
            <h1>Balloon Pop Game</h1>
            <StickPersonImage />
            <PlayButton />
        </>
    )
}

export default Home
