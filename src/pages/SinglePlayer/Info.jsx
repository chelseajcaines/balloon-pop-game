import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { avatars } from "../../data/const"
import PlayerInfo from "../../components/PlayerInfo"
import styles from "/src/stylesheets/SinglePlayerSetup.module.css"

const SinglePlayerSetup = () => {
    const [activeAvatar, setActiveAvatar] = useState(0)
    const [selectedAvatar, setSelectedAvatar] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [inputError, setInputError] = useState("")
    const [avatarError, setAvatarError] = useState("")
    const [inputFocus, setInputFocus] = useState(false)
    const [nextButtonActive, setNextButtonActive] = useState(false)

    const navigate = useNavigate()

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
