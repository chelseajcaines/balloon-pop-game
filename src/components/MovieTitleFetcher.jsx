import { useState } from "react"
import { useEffect } from "react"

const MovieTitleFetcher = () => {
    const [movieTitle, setMovieTitle] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchRandomWellKnownMovieTitle = async () => {
        setError(null)

        const apiKey = "277f68e7e4a806dcf0eea77c75c6391f"
        const listId = "8286021-movies"

        const endpoint = `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}&language=en-US`

        try {
            const response = await fetch(endpoint)
            if (!response.ok) {
                throw new Error("Failed to fetch movie data.")
            }
            const data = await response.json()
            const randomMovieIndex = Math.floor(
                Math.random() * data.items.length
            )
            const title = data.items[randomMovieIndex]?.title || ""
            setMovieTitle(title)
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchRandomWellKnownMovieTitle()
    }, []) // Empty dependency array ensures the effect runs once when the component mounts

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {error && <p>Error: {error}</p>}
                    {movieTitle && (
                        <p>Random Well-Known Movie Title: {movieTitle}</p>
                    )}
                </>
            )}
        </div>
    )
}

export default MovieTitleFetcher
