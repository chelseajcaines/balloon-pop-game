import "/src/App.css"

const Avatar = ({ src, alt, onMouseEnter, onClick, activeAvatar }) => {
    return (
        <>
            <img
                src={src}
                alt={alt}
                onMouseEnter={onMouseEnter}
                onClick={onClick}
                className={activeAvatar ? "activeAvatar" : "avatar"}
            />
        </>
    )
}

export default Avatar
