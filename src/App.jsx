import { RouterProvider } from "react-router-dom"
import router from "./Routes"
import { useState } from "react"
import AvatarContext from "/src/contexts/AvatarContext"

const App = () => {
    const [selectedAvatar, setSelectedAvatar] = useState(null)
    return (
        <AvatarContext.Provider value={{ selectedAvatar, setSelectedAvatar }}>
            <div className="App">
                <RouterProvider router={router} />
            </div>
        </AvatarContext.Provider>
    )
}

export default App
