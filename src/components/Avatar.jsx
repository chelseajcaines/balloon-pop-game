import "/src/App.css"

const Avatar = ({
    src,
    alt,
    onMouseEnter,
    onClick,
    activeAvatar,
    playerDisabled,
}) => {
    return (
        <>
            <img
                src={src}
                alt={alt}
                onMouseEnter={onMouseEnter}
                onClick={onClick}
                className={
                    playerDisabled
                        ? "avatarDisabled"
                        : activeAvatar
                        ? "activeAvatar"
                        : "avatar"
                }
            />
        </>
    )
}

export default Avatar
