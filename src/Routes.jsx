import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import SinglePlayerSetup from "./pages/SinglePlayer/Info"
import SinglePlayerGamePlay from "./pages/SinglePlayer/MovieTitles"
import TwoPlayerSetup from "./pages/TwoPlayer/Info"
import Categories from "./pages/SinglePlayer/Categories"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/SinglePlayer/Info",
        element: <SinglePlayerSetup />,
    },
    {
        path: "/SinglePlayer/MovieTitles",
        element: <SinglePlayerGamePlay />,
    },
    {
        path: "/TwoPlayer/Info",
        element: <TwoPlayerSetup />,
    },
    {
        path: "/SinglePlayer/Categories",
        element: <Categories />,
    },
])

export default router
