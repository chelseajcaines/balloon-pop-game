import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import Opponents from "./pages/Opponents"
import Computer from "./pages/Computer"
import Human from "./pages/Human"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/opponents",
        element: <Opponents />,
    },
    {
        path: "/computer",
        element: <Computer />,
    },
    {
        path: "/human",
        element: <Human />,
    },
])

export default router
