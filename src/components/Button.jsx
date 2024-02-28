import "/src/App.css"

const Button = ({
    text,
    isActive,
    onClick,
    onMouseEnter,
    onMouseLeave,
    playerTwoDisabled,
    playerOneDisabled,
}) => {
    return (
        <button
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            onMouseLeave={onMouseLeave}
            className={
                playerTwoDisabled || playerOneDisabled
                    ? "buttonDisabled"
                    : isActive
                    ? "activeButton"
                    : "button"
            }
        >
            {text}
        </button>
    )
}

export default Button
