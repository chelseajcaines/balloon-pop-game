import styles from "/src/stylesheets/Avatar.module.css"

const Avatar = ({ src, alt, key, onMouseEnter, onClick, activeAvatar }) => {
    return (
        <>
            <img
                src={src}
                alt={alt}
                key={key}
                onMouseEnter={onMouseEnter}
                onClick={onClick}
                className={activeAvatar ? styles.activeAvatar : styles.avatar}
            />
        </>
    )
}

export default Avatar
