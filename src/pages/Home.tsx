import Header from "../components/Header";
import LatestNews from "../components/LatestNews";
import LeftSideBar from "../components/LeftSideBar";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <Header />
        <LatestNews />
        <Navbar />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="leftsideBar">
            <LeftSideBar />
          </div>
          <div className="md:col-span-2">
            <h2>Home Content</h2>
          </div>
          <div className="rightSideBar">
            <h2>Right Side bar</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
