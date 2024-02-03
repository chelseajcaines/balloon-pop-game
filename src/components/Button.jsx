const Button = ({ onMouseEnter, text, onClick, key }) => {
    return (
        <button key={key} onMouseEnter={onMouseEnter} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button
