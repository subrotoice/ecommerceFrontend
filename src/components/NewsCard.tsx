import { FaShareAlt, FaRegBookmark, FaStar, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { News } from "./HomePageMiddleNews";

interface Props {
  news: News;
}

const NewsCard = ({
  news: { _id, title, image_url, rating, total_view, author, details },
}: Props) => {
  return (
    <div>
      <div
        className="transition duration-300 rounded-md 
          shadow-2xl mb-8"
      >
        <div>
          {/* Card Header */}
          <div
            className="flex justify-between items-center bg-slate-800 py-2 px-8 
          border border-gray-700 rounded-tl-md rounded-br-md"
          >
            <div className="flex">
              <img src={author.img} className="rounded-full h-12 w-12 mb-2" />
              <div className="ml-3">
                {" "}
                <h2 className="text-sm">{author.name}</h2>
                <span className="text-sm">{author.published_date}</span>
              </div>
            </div>

            <div className="flex">
              <FaShareAlt size={20} />
              <FaRegBookmark className="ml-4" size={20} />
            </div>
          </div>

          <h4 className="text-lg mt-1 font-semibold py-3 px-8">{title}</h4>
          <img src={image_url} className="w-full rounded-md px-8" />
          {details.length > 200 ? (
            <p className="text-sm text-gray-400 text-justify py-3 px-8">
              {details.slice(0, 200)}{" "}
              <Link
                to={`/news/${_id}`}
                state={`/news/${_id}`}
                className="text-blue-600 underline font-bold text-lg"
              >
                Read More...
              </Link>
            </p>
          ) : (
            <p className="text-sm text-gray-400 text-justify py-3 px-8">
              {details}
            </p>
          )}

          {/* Card Footer */}
          <div className="flex justify-between items-center bg-slate-800 py-4 px-8 border border-gray-700 mt-2 rounded-tr-md rounded-bl-md">
            <div className="flex">
              <FaStar size={25} color="orange" />
              <span className="ml-2">{rating.number}</span>
            </div>
            <div className="flex">
              <FaEye size={20} />
              <span className="ml-4">{total_view}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
