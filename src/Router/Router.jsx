import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Home from "../pages/Home/Home.jsx" ;
import Katalog from "../pages/Katalog/Katalog.jsx";
import Savat from "../pages/Savat/Savat.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "katalog",
        element: <Katalog />,
      },
      {
        path: "savat",
        element: <Savat />,
      },
    ],
  },
]);