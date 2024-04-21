import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import SinglePlayerSetup from "./pages/SinglePlayer/Info"
import SinglePlayerMovieTitles from "./pages/SinglePlayer/MovieTitles"
import SinglePlayerPhrases from "./pages/SinglePlayer/Phrases"
import SinglePlayerFood from "./pages/SinglePlayer/Food"
import SinglePlayerBrands from "./pages/SinglePlayer/Brands"
import TwoPlayerSetup from "./pages/TwoPlayer/Info"
import SinglePlayerCategories from "./pages/SinglePlayer/Categories"
import TwoPlayerCategories from "./pages/TwoPlayer/Categories"
import TwoPlayerMovieTitles from "./pages/TwoPlayer/MovieTitles"
import TwoPlayerPhrases from "./pages/TwoPlayer/Phrases"
import TwoPlayerFood from "./pages/TwoPlayer/Food"
import TwoPlayerBrands from "./pages/TwoPlayer/Brands"

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
        path: "/SinglePlayer/Phrases",
        element: <SinglePlayerPhrases />,
    },
    {
        path: "/SinglePlayer/Food",
        element: <SinglePlayerFood />,
    },
    {
        path: "/SinglePlayer/Brands",
        element: <SinglePlayerBrands />,
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
    {
        path: "/TwoPlayer/Phrases",
        element: <TwoPlayerPhrases />,
    },
    {
        path: "/TwoPlayer/Food",
        element: <TwoPlayerFood />,
    },
    {
        path: "/TwoPlayer/Brands",
        element: <TwoPlayerBrands />,
    },
])

export default router
