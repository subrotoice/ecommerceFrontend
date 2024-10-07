import {
  FaFacebook,
  FaGithub,
  FaGoogle,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import qzone1 from "../assets/qZone1.png";
import qzone2 from "../assets/qZone2.png";
import qzone3 from "../assets/qZone3.png";

const RightSideBar = () => {
  return (
    <div>
      <div className="p-4 mb-6 space-y-4">
        <h2
          className="text-3xl hover:text-indigo-600 transition 
                duration-500 ease-in-out"
        >
          Login With
        </h2>
        <Link to="/login">
          <button className="btn btn-outline btn-primary w-full rounded-none my-2">
            <FaGoogle />
            Login With Google
          </button>
        </Link>
        <Link to="/login">
          <button className="btn btn-outline btn-primary w-full rounded-none">
            <FaGithub />
            Login With GitHub
          </button>
        </Link>
      </div>

      <div className="p-4 mb-6">
        <h2
          className="text-3xl mb-4 hover:text-indigo-600 transition 
                duration-500 ease-in-out"
        >
          Find us on
        </h2>
        <Link
          className="p-4 flex text-lg items-center border rounded-tl-md"
          to={""}
        >
          <FaFacebook className="mr-2 text-blue-700"></FaFacebook> Facebook
        </Link>
        <Link className="p-4 flex text-lg items-center border-x" to={""}>
          <FaTwitter className="mr-2"></FaTwitter> Twitter
        </Link>
        <Link
          className="p-4 flex text-lg items-center border rounded-br-md"
          to={""}
        >
          <FaInstagram className="mr-2 text-orange-600"></FaInstagram>{" "}
          Instragram
        </Link>
      </div>

      <div className="p-4 mb-6">
        <h2
          className="text-3xl mb-4 hover:text-indigo-600 transition 
                duration-500 ease-in-out"
        >
          Q Zone
        </h2>
        <div className="space-y-3">
          <img src={qzone1} alt="qzone1" />
          <img src={qzone2} alt="qzone2" />
          <img src={qzone3} alt="qzone3" />
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
