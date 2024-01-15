import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
import styles from "/src/stylesheets/Categories.module.css"

const Categories = () => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const playerName = params.get("name")

    const navigate = useNavigate()
    const movieTitles = () => {
        navigate(`/SinglePlayerGamePlay?name=${playerName}`)
    }

    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.header}>
                    <h1>Choose Puzzle Category</h1>
                    <div className={styles.categoryList}>
                        <button onClick={movieTitles}>Movie Titles</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Categories
