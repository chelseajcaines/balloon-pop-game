import { RouterProvider } from "react-router-dom"
import router from "./Routes"

export default function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    )
}
