const LeaveGameModal = ({
    isOpen,
    handleYesClick,
    handleNoClick,
    onCancel,
}) => {
    const modalStyles = {
        position: "fixed",
        height: "200px",
        width: "200px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        display: isOpen ? "block" : "none",
    }

    const overlayStyles = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        display: isOpen ? "block" : "none",
        zIndex: 999,
    }

    return (
        <>
            <div style={overlayStyles} onClick={onCancel}></div>
            <div style={modalStyles}>
                <p>Leave game and return to home page?</p>
                <button onClick={handleYesClick}>Yes</button>
                <button onClick={handleNoClick}>No</button>
            </div>
        </>
    )
}

export default LeaveGameModal
