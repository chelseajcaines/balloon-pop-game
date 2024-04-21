import "/src/App.css"

const FetchStatus = ({ isLoading, error }) => {
    return (
        <>
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <>{error && <p>Error: {error}</p>}</>
                )}
            </div>
        </>
    )
}

export default FetchStatus
