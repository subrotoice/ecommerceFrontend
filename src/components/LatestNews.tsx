import Marquee from "react-fast-marquee";

const LatestNews = () => {
  return (
    <div className="flex">
      <button className="btn btn-warning">Latest News</button>
      <Marquee pauseOnHover={true}>
        <p className="mr-6">Breking News: Majore Earthquake Stricks</p>
        <p className="mr-4">Bangladeshi resurve increasing</p>
      </Marquee>
    </div>
  );
};

export default LatestNews;
