import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { News } from "./HomePageMiddleNews";

interface Props {
  newsDetails: News;
}

const NewsDetailsCard = ({
  newsDetails: { title, image_url, rating, details, category_id },
}: Props) => {
  return (
    <div className="col-span-3">
      <div className="mx-auto p-5 sm:p-10 md:p-16">
        <div className="mb-10 rounded overflow-hidden flex flex-col mx-auto">
          <h1
            className="text-md sm:text-2xl font-semibold hover:text-indigo-600 transition 
      duration-500 ease-in-out inline-block mb-2 text-justify"
          >
            {title}
          </h1>

          <div className="mt-2">
            <img className="w-full" src={image_url} alt="News Image" />
          </div>
          <p className="text-white text-justify py-5 text-base leading-8">
            {details}
          </p>
          <div className="py-5 text-sm font-regular text-white flex justify-between">
            <div className="flex">
              <FaStar size={25} color="orange" />
              <span className="ml-2 text-lg">{rating.number}</span>
            </div>
            <div>
              <Link to={`/category/${category_id}`}>
                <button className="btn btn-outline btn-warning rounded-none">
                  All News in this Category
                </button>
              </Link>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default NewsDetailsCard;
