import { avatarArray } from "/src/data/const"
import styles from "/src/stylesheets/AvatarGallery.module.css"

const AvatarGallery = () => {
    return (
        <>
            {avatarArray.map((avatar) => (
                <img
                    key={avatar.id}
                    src={avatar.src}
                    alt={avatar.alt}
                    style={{ cursor: "pointer", margin: "10px" }}
                    onClick={() => handleAvatarClick(avatar)}
                    className={
                        avatar === activeAvatar
                            ? styles.activeAvatar
                            : styles.avatar
                    }
                />
            ))}
        </>
    )
}

export default AvatarGallery
