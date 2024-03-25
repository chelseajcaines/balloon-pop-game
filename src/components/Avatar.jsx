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
            <div className="avatarWrapper">
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
            </div>
        </>
    )
}

export default Avatar
