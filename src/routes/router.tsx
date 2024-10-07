import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import AuthLayout from "../pages/AuthLayout";
import Career from "../pages/Career";
import Home from "../pages/Home";
import Login from "../pages/Login";
import News from "../pages/News";
import NewsDetails from "../pages/NewsDetails";
import Register from "../pages/Register";
import NewsCategories from "../pages/NewsCategories";
import NotFound from "../pages/NotFound";
import PrivateRoutes from "../pages/PrivateRoutes";

const router = createBrowserRouter([
  { path: "/", errorElement: <NotFound />, element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/career", element: <Career /> },
  { path: "/news", element: <News /> },
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/news/:id",
        element: <NewsDetails />,
        loader: async ({ params }) => {
          const response = await fetch(
            `https://express-server-xi-one.vercel.app/news/${params.id}`
          );
          return await response.json(); // Ensure valid JSON
        },
      },
      {
        path: "/category/:id",
        element: <NewsCategories />,
        loader: async ({ params }) => {
          const response = await fetch(
            `https://express-server-xi-one.vercel.app/${params.id}`
          );
          return await response.json(); // Ensure valid JSON
        },
      },
    ],
  },
]);

export default router;
