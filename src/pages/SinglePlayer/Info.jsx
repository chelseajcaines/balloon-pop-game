import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import PlayerInfo from "../../components/PlayerInfo"
import styles from "/src/stylesheets/SinglePlayerSetup.module.css"

const SinglePlayerSetup = () => {
    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.header}>
                    <h1>Single Player Setup</h1>
                </div>
                <PlayerInfo />
            </div>
        </>
    )
}

export default SinglePlayerSetup
