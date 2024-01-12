import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import Opponent from "./pages/Opponent"
import SinglePlayerSetup from "./pages/SinglePlayerSetup"
import SinglePlayerGamePlay from "./pages/SinglePlayerGamePlay"
import TwoPlayerSetup from "./pages/TwoPlayerSetup"
import Categories from "./pages/Categories"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/Opponent",
        element: <Opponent />,
    },
    {
        path: "/SinglePlayerSetup",
        element: <SinglePlayerSetup />,
    },
    {
        path: "/SinglePlayerGamePlay",
        element: <SinglePlayerGamePlay />,
    },
    {
        path: "/TwoPlayerSetup",
        element: <TwoPlayerSetup />,
    },
    {
        path: "/Categories",
        element: <Categories />,
    },
])

export default router
