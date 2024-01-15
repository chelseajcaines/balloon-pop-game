const PlayerAvatar = ({ selectedAvatar }) => {
    if (!selectedAvatar) return null

    return (
        <div>
            {selectedAvatar && (
                <img src={selectedAvatar.src} alt={selectedAvatar.alt} />
            )}
        </div>
    )
}

export default PlayerAvatar
