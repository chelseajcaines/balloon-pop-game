import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import SinglePlayerSetup from "./pages/SinglePlayer/Info"
import SinglePlayerMovieTitles from "./pages/SinglePlayer/MovieTitles"
import TwoPlayerSetup from "./pages/TwoPlayer/Info"
import SinglePlayerCategories from "./pages/SinglePlayer/Categories"
import TwoPlayerCategories from "./pages/TwoPlayer/Categories"
import TwoPlayerMovieTitles from "./pages/TwoPlayer/MovieTitles"

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
        path: "/SinglePlayer/Categories",
        element: <SinglePlayerCategories />,
    },
    {
        path: "/SinglePlayer/MovieTitles",
        element: <SinglePlayerMovieTitles />,
    },
    {
        path: "/TwoPlayer/Info",
        element: <TwoPlayerSetup />,
    },
    {
        path: "/TwoPlayer/Categories",
        element: <TwoPlayerCategories />,
    },
    {
        path: "/TwoPlayer/MovieTitles",
        element: <TwoPlayerMovieTitles />,
    },
])

export default router
