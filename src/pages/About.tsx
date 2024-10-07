import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Navbar />
      <div className="flex  justify-center ">
        <div className="max-w-96 bg-white shadow flex flex-col my-4 p-6 ">
          <p className="text-xl font-semibold pb-5">About Us</p>
          <p className="pb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            mattis est eu odio sagittis tristique. Vestibulum ut finibus leo. In
            hac habitasse platea dictumst.
          </p>
          <a
            href="#"
            className="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 flex items-center justify-center px-2 py-3 mt-4"
          >
            Get to know us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
