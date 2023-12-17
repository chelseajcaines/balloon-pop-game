import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import ChooseOpponent from "./pages/choose-opponent"
import ComputerPlayerInfo from "./pages/computer-player-info"
import HumanPlayerInfo from "./pages/human-player-info"
import ComputerGamePlay from "./pages/computer-game-play"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/choose-opponent",
        element: <ChooseOpponent />,
    },
    {
        path: "/computer-player-info",
        element: <ComputerPlayerInfo />,
    },
    {
        path: "/human-player-info",
        element: <HumanPlayerInfo />,
    },
    {
        path: "/computer-game-play",
        element: <ComputerGamePlay />,
    },
])

export default router
