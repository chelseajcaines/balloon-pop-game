import { avatarArray } from "/src/data/const"
import { useContext } from "react"
import AvatarContext from "/src/contexts/AvatarContext"

const ChooseAvatar = () => {
    const { setSelectedAvatar } = useContext(AvatarContext)
    const handleAvatarClick = (avatar) => {
        setSelectedAvatar(avatar)
    }

    return (
        <>
            {avatarArray.map((avatar) => (
                <img
                    key={avatar.id}
                    src={avatar.src}
                    alt={avatar.alt}
                    style={{ cursor: "pointer", margin: "10px" }}
                    onClick={() => handleAvatarClick(avatar)}
                />
            ))}
        </>
    )
}

export default ChooseAvatar

//{selectedAvatar && (<img src={selectedAvatar.src} alt={selectedAvatar.alt} />)}
