import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = () => {
  const { user } = useAuth();

  const location = useLocation(); // Get the current location (the news page)
  if (!user) return <Navigate to="/login" state={location.state} />;

  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default PrivateRoutes;
