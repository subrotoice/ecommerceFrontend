import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import AuthLayout from "../pages/AuthLayout";
import Career from "../pages/Career";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NewsCategories from "../pages/NewsCategories";
import NewsDetails from "../pages/NewsDetails";
import NotFound from "../pages/NotFound";
import PrivateRoutes from "../pages/PrivateRoutes";
import Products from "../pages/Products";
import Register from "../pages/Register";

const router = createBrowserRouter([
  { path: "/", errorElement: <NotFound />, element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/career", element: <Career /> },
  { path: "/products", element: <Products /> },
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
            `https://express-server-xi-one.vercel.app/category/${params.id}`
          );
          return await response.json(); // Ensure valid JSON
        },
      },
    ],
  },
]);

export default router;
