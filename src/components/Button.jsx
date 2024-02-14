import { useNavigate } from "react-router-dom"
import "/src/App.css"

const Button = ({
    text,
    nextPage,
    isActive,
    onClick,
    onMouseEnter,
    onMouseLeave,
}) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(nextPage)
    }

    return (
        <button
            onMouseEnter={onMouseEnter}
            onClick={onClick || handleClick}
            onMouseLeave={onMouseLeave}
            className={isActive ? "activeButton" : "button"}
        >
            {text}
        </button>
    )
}

export default Button
