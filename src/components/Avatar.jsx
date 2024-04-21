import "/src/App.css"

const Avatar = ({
    src,
    alt,
    onMouseEnter,
    onClick,
    activeAvatar,
    playerDisabled,
    singlePlayer,
    playerOne,
    playerTwo,
}) => {
    return (
        <>
            <div
                className={
                    singlePlayer && activeAvatar
                        ? "activeAvatarWrapper"
                        : singlePlayer
                        ? "avatarWrapper"
                        : playerOne && activeAvatar
                        ? "activeAvatarWrapperTwoPlayer"
                        : playerTwo && activeAvatar
                        ? "activeAvatarWrapperTwoPlayer"
                        : playerOne || playerTwo
                        ? "avatarWrapperTwoPlayer"
                        : ""
                }
            >
                <img
                    src={src}
                    alt={alt}
                    onMouseEnter={onMouseEnter}
                    onClick={onClick}
                    className={
                        playerDisabled && singlePlayer
                            ? "avatarDisabled"
                            : playerDisabled && playerOne
                            ? "avatarDisabledTwoPlayer"
                            : playerDisabled && playerTwo
                            ? "avatarDisabledTwoPlayer"
                            : activeAvatar && singlePlayer
                            ? "activeAvatar"
                            : activeAvatar && playerOne
                            ? "activeAvatarTwoPlayer"
                            : activeAvatar && playerTwo
                            ? "activeAvatarTwoPlayer"
                            : singlePlayer
                            ? "avatar"
                            : playerOne
                            ? "avatarTwoPlayer"
                            : playerTwo
                            ? "avatarTwoPlayer"
                            : ""
                    }
                />
            </div>
        </>
    )
}

export default Avatar
