import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to={`/login`} />;

  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default PrivateRoutes;
