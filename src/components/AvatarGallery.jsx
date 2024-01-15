import { avatarArray } from "/src/data/const"

const AvatarGallery = ({ handleAvatarClick }) => {
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

export default AvatarGallery
