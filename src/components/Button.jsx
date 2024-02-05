import { useNavigate } from "react-router-dom"
import styles from "/src/stylesheets/Button.module.css"

const Button = ({ text, nextPage, isActive, onClick, onMouseEnter }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(nextPage)
    }

    return (
        <button
            onMouseEnter={onMouseEnter}
            onClick={onClick || handleClick}
            className={isActive ? styles.activeButton : styles.button}
        >
            {text}
        </button>
    )
}

export default Button
