import avatarArray from "/src/data/avatar-array"
import { useState } from "react"

const PlayerChoosesAvatar = () => {
    const [selectedAvatar, setSelectedAvatar] = useState(null)
    const handleAvatarClick = (avatar) => {
        setSelectedAvatar(avatar)
    }

    return (
        <>
            <div>
                {avatarArray.map((avatar) => (
                    <div
                        key={avatar.id}
                        onClick={() => handleAvatarClick(avatar)}
                        style={{
                            cursor: "pointer",
                            backgroundColor:
                                selectedAvatar === avatar ? "blue" : "white",
                        }}
                    >
                        <img src={avatar.src} alt={avatar.alt} />
                    </div>
                ))}
            </div>
            <div>
                <p>Your Avatar</p>
                {selectedAvatar && (
                    <img src={selectedAvatar.src} alt={selectedAvatar.alt} />
                )}
            </div>
        </>
    )
}

export default PlayerChoosesAvatar
