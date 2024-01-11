const FetchStatusMessage = ({ isLoading, error }) => {
    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>{error && <p>Error: {error}</p>}</>
            )}
        </div>
    )
}

export default FetchStatusMessage
