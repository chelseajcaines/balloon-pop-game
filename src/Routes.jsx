import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import SinglePlayerSetup from "/SinglePlayer/Info"
import SinglePlayerMovieTitles from "/SinglePlayer/MovieTitles"
import SinglePlayerPhrases from "/SinglePlayer/Phrases"
import SinglePlayerFood from "/SinglePlayer/Food"
import SinglePlayerBrands from "/SinglePlayer/Brands"
import TwoPlayerSetup from "/TwoPlayer/Info"
import SinglePlayerCategories from "/SinglePlayer/Categories"
import TwoPlayerCategories from "/TwoPlayer/Categories"
import TwoPlayerMovieTitles from "/TwoPlayer/MovieTitles"
import TwoPlayerPhrases from "/TwoPlayer/Phrases"
import TwoPlayerFood from "/TwoPlayer/Food"
import TwoPlayerBrands from "/TwoPlayer/Brands"

const router = createBrowserRouter([
    { basename: import.meta.env.DEV ? "/" : "/balloon-pop-game/" },
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
