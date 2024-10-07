import Header from "../components/Header";
import HomePageContent from "../components/HomePageContent";
import LatestNews from "../components/LatestNews";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <Header />
        <LatestNews />
        <Navbar />
        <HomePageContent />
      </div>
    </>
  );
};

export default Home;
