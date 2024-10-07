import axios from "axios";
import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";

interface Rating {
  number: number;
}

interface Author {
  img: string; // URL to the image
  name: string; // Any other properties like name, etc.
  published_date: string;
}

export interface News {
  _id: number;
  title: string;
  image_url: string;
  rating: Rating;
  total_view: number;
  author: Author;
  details: string;
  category_id: number;
}

const HomePageMiddleNews = () => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    axios
      .get<News[]>("http://localhost:5000/news")
      .then((res) => setNews(res.data)) // Success or No Error
      .catch((err) => console.log(err.message)); // Fail or Error
  }, []);

  console.log(news);

  return (
    <div>
      {news.map((singleNews) => (
        <NewsCard news={singleNews} />
      ))}
    </div>
  );
};

export default HomePageMiddleNews;
