import { useLoaderData } from "react-router-dom";
import { News } from "../components/HomePageMiddleNews";
import NewsDetailsCard from "../components/NewsDetailsCard";
import RightSideBar from "../components/RightSideBar";

const NewsDetails = () => {
  const newsDetails = useLoaderData() as News;

  return (
    <div>
      <div className="grid grid-cols-4">
        <NewsDetailsCard newsDetails={newsDetails} />
        <div className="col-span-1 p-4 shadow-md">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
