import { createBrowserRouter } from "react-router-dom";

import Inicio from "./components/Inicio/Inicio";
import Cinema from "./components/Cinema/Cinema";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Inicio />
    },
    {
        path: "/cinema",
        element: <Cinema jogoIniciado={true} />
    }
]);

export default routes;