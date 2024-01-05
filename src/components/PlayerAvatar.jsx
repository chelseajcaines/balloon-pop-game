import { useContext } from "react"
import AvatarContext from "/src/contexts/AvatarContext"

const PlayerAvatar = () => {
    const { selectedAvatar } = useContext(AvatarContext)

    if (!selectedAvatar) return null

    return (
        <div>
            <h3>Selected Avatar</h3>
            <img src={selectedAvatar.src} alt={selectedAvatar.alt} />
        </div>
    )
}

export default PlayerAvatar
