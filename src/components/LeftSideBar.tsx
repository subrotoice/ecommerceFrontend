import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface Categories {
  id: number;
  name: string;
}

const LeftSideBar = () => {
  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    fetch("https://express-server-xi-one.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>All Category: {categories.length}</h2>
      <div className="flex flex-col w-11/12 mx-auto gap-4 mt-4">
        {categories.map(({ id, name }) => (
          <NavLink to={`/category/${id}`} key={id}>
            <button className="btn btn-outline btn-success w-full">
              {name}
            </button>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default LeftSideBar;
