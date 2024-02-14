import "/src/App.css"

const Avatar = ({ src, alt, key, onMouseEnter, onClick, activeAvatar }) => {
    return (
        <>
            <img
                src={src}
                alt={alt}
                key={key}
                onMouseEnter={onMouseEnter}
                onClick={onClick}
                className={activeAvatar ? "activeAvatar" : "avatar"}
            />
        </>
    )
}

export default Avatar
