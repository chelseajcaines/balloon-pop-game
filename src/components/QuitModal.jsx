const QuitModal = ({ isOpen, handleYesButtonClick, handleNoButtonClick }) => {
    const modalStyles = {
        position: "fixed",
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: isOpen ? "block" : "none",
        zIndex: 999,
    }

    return (
        <>
            <div style={overlayStyles}></div>
            <div style={modalStyles}>
                <p>Are you sure?</p>
                <button onClick={handleYesButtonClick}>Yes</button>
                <button onClick={handleNoButtonClick}>No</button>
            </div>
        </>
    )
}

export default QuitModal