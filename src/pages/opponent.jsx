import stickPerson from "../assets/stickPerson.png"
import stickPeople from "../assets/stickPeople.png"
import BestScore from "../components/BestScore"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Opponent = () => {
    const [bestScore, setBestScore] = useState(0)

    useEffect(() => {
        const prevHighScore = localStorage.getItem("HIGH_SCORE_KEY")
        setBestScore(JSON.parse(prevHighScore))
    }, [])

    return (
        <>
            <h1>Single Player or Play with a Friend</h1>
            <Image src={stickPerson} />
            <SinglePlayerButton />
            <BestScore bestScore={bestScore} />
            <Image src={stickPeople} />
            <TwoPlayerButton />
        </>
    )
}

const SinglePlayerButton = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/SinglePlayerSetup")
    }
    return <Button onClick={handleClick} title="Single Player" />
}

const TwoPlayerButton = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/TwoPlayerSetup")
    }
    return <Button onClick={handleClick} title="Two Player" />
}

const Button = ({ onClick, title }) => {
    return <button onClick={onClick}>{title}</button>
}

const Image = ({ src }) => {
    return <img src={src} />
}

export default Opponent
