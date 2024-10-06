import { Link, useNavigate } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useAuth } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logout } = useAuth(); // Access the user and login function

  const navigate = useNavigate();

  const handelLogout = async () => {
    try {
      await logout(); // Handle Firebase login
      navigate("/"); // Redirect to homepage after successful login
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <NavLinks />
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            Breaking News
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          {!user ? (
            <Link to="/login">
              <button className="btn btn-outline btn-sm btn-accent">
                Login
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button
                onClick={handelLogout}
                className="btn btn-outline btn-sm btn-accent"
              >
                Logout
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
