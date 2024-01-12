const PlayerAvatar = ({ selectedAvatar }) => {
    if (!selectedAvatar) return null

    return (
        <div>
            <h3>Selected Avatar</h3>
            {selectedAvatar && (
                <img src={selectedAvatar.src} alt={selectedAvatar.alt} />
            )}
        </div>
    )
}

export default PlayerAvatar
