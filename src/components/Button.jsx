import "/src/App.css"

const Button = ({
    text,
    isActive,
    onClick,
    onMouseEnter,
    onMouseLeave,
    playerDisabled,
}) => {
    return (
        <button
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            onMouseLeave={onMouseLeave}
            className={
                playerDisabled
                    ? "buttonDisabledTwoPlayer"
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
