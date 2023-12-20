import alphabet from "../data/alphabet-array"

const ChooseLetter = () => {
    return (
        <div>
            {alphabet.map((letter) => (
                <div
                    key={letter}
                    style={{
                        display: "inline-block",
                        padding: "10px",
                        margin: "5px",
                        border: "1px solid black",
                        cursor: "pointer",
                        color: "black",
                    }}
                >
                    {letter}
                </div>
            ))}
        </div>
    )
}

export default ChooseLetter
