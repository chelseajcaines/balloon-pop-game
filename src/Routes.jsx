import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import Opponent from "./pages/opponent"
import SinglePlayerSetup from "./pages/single-player-setup"
import TwoPlayerSetup from "./pages/two-player-setup"
import SinglePlayerGamePlay from "./pages/single-player-game-play"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/opponent",
        element: <Opponent />,
    },
    {
        path: "/single-player-setup",
        element: <SinglePlayerSetup />,
    },
    {
        path: "/two-player-setup",
        element: <TwoPlayerSetup />,
    },
    {
        path: "/single-player-game-play",
        element: <SinglePlayerGamePlay />,
    },
])

export default router
