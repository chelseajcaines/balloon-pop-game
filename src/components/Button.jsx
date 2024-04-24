import "/src/App.css"

const Button = ({
    text,
    isActive,
    onClick,
    onMouseEnter,
    onMouseLeave,
    playerDisabled,
    twoPlayer,
}) => {
    return (
        <button
            onMouseEnter={onMouseEnter}
            onClick={onClick}
            onMouseLeave={onMouseLeave}
            className={
                playerDisabled
                    ? "buttonDisabledTwoPlayer"
                    : isActive && !twoPlayer
                    ? "activeButton"
                    : isActive && twoPlayer
                    ? "activeButtonTwoPlayer"
                    : twoPlayer
                    ? "buttonTwoPlayer"
                    : "button"
            }
        >
            {text}
        </button>
    )
}

export default Button
