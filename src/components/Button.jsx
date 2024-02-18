import "/src/App.css"

const Button = ({ text, isActive, onClick, onMouseEnter, onMouseLeave }) => {
    return (
        <button
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            onMouseLeave={onMouseLeave}
            className={isActive ? "activeButton" : "button"}
        >
            {text}
        </button>
    )
}

export default Button
