import HomePageMiddleNews from "./HomePageMiddleNews";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";

const HomePageContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
      <div className="leftsideBar">
        <LeftSideBar />
      </div>
      <div className="md:col-span-2">
        <HomePageMiddleNews />
      </div>
      <div className="rightSideBar">
        <RightSideBar />
      </div>
    </div>
  );
};

export default HomePageContent;
