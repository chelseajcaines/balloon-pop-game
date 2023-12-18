import avatarArray from "./avatar-array"
import { useState } from "react"

const PlayerChoosesAvatar = () => {
    const [selectedAvatar, setSelectedAvatar] = useState(null)

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

export default PlayerChoosesAvatar
