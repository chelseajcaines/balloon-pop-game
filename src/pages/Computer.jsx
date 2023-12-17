import cat from "../assets/cat.png"
import dog from "../assets/dog.png"
import fox from "../assets/fox.png"
import duck from "../assets/duck.png"
import sloth from "../assets/sloth.png"

export default function Computer() {
    return (
        <>
            <h1>Playing Against Computer</h1>
            <p>Choose your avatar</p>
            <div>
                <img src={cat} />
                <img src={dog} />
                <img src={fox} />
                <img src={duck} />
                <img src={sloth} />
            </div>
            <div>
                <p>Enter name</p>
                <input></input>
            </div>

            <button>Ready</button>
        </>
    )
}
