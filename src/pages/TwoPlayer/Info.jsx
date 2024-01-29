import styles from "/src/stylesheets/TwoPlayerSetup.module.css"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const TwoPlayerSetup = () => {
    const [selectedAvatar, setSelectedAvatar] = useState("")
    const [avatarError, setAvatarError] = useState("")
    const [inputError, setInputError] = useState("")

    const navigate = useNavigate()

    const avatars = [
        {
            id: 0,
            src: "/src/assets/cat.png",
            alt: "Cat",
        },
        {
            id: 1,
            src: "/src/assets/dog.png",
            alt: "Dog",
        },
        {
            id: 2,
            src: "/src/assets/fox.png",
            alt: "Fox",
        },
        {
            id: 3,
            src: "/src/assets/duck.png",
            alt: "Duck",
        },
        {
            id: 4,
            src: "/src/assets/sloth.png",
            alt: "Sloth",
        },
    ]

    return (
        <>
            <div className={styles.pageContainer}>
                <h1 className={styles.header}>Two Player Setup</h1>
                <div className={styles.playerContainers}>
                    <div className={styles.playerOneContainer}>
                        <p>Player 1</p>
                        <div className={styles.avatarGallery}>
                            {avatars.map((avatar) => (
                                <img
                                    key={avatar.id}
                                    src={avatar.src}
                                    alt={avatar.alt}
                                />
                            ))}
                        </div>
                        <div>
                            {selectedAvatar && (
                                <img
                                    className={styles.selectedAvatar}
                                    src={selectedAvatar.src}
                                    alt={selectedAvatar.alt}
                                />
                            )}
                        </div>
                        <p style={{ color: "red" }}>{avatarError}</p>

                        <p>Enter name</p>
                        <input type="text" />
                        <p style={{ color: "red" }}>{inputError}</p>
                        <button>Ready</button>
                    </div>
                    <div className={styles.playerTwoContainer}>
                        <p>Player 2</p>
                        <div className={styles.avatarGallery}>
                            {avatars.map((avatar) => (
                                <img
                                    key={avatar.id}
                                    src={avatar.src}
                                    alt={avatar.alt}
                                />
                            ))}
                        </div>
                        <div>
                            {selectedAvatar && (
                                <img
                                    className={styles.selectedAvatar}
                                    src={selectedAvatar.src}
                                    alt={selectedAvatar.alt}
                                />
                            )}
                        </div>
                        <p style={{ color: "red" }}>{avatarError}</p>

                        <p>Enter name</p>
                        <input type="text" />
                        <p style={{ color: "red" }}>{inputError}</p>
                        <button>Ready</button>
                    </div>
                </div>
                <button
                    className={styles.startButton}
                    onClick={() => navigate("/TwoPlayer/Categories")}
                >
                    Start
                </button>
            </div>
        </>
    )
}

export default TwoPlayerSetup
