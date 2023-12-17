import { useState } from "react"

const AvatarGallery = () => {
    const [selectedAvatar, setSelectedAvatar] = useState(null)
    const avatarArray = [
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
    const handleAvatarIsClick = (avatarId) => {
        setSelectedAvatar(avatarId)
    }
    return (
        <div>
            {avatarArray.map((avatar) => (
                <div
                    key={avatar.id}
                    onClick={() => handleAvatarIsClick(avatar.id)}
                    style={{
                        cursor: "pointer",
                        backgroundColor:
                            selectedAvatar === avatar.id
                                ? "blue"
                                : "transparent",
                    }}
                >
                    <img src={avatar.src} alt={avatar.alt} />
                </div>
            ))}
        </div>
    )
}

export default AvatarGallery
