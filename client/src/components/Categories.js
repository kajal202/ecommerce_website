import React from "react";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
      <div className="px-3 d-flex align-items-center justify-content-center">
        {categories.map((c) => (
          <div
            className=" border text-center py-5 bg-gray border"
            style={{
              height: "8rem",
              marginLeft: "20px",
              width: "11rem",
              borderRadius: "10px",
              backgroundColor: "aqua",
            }}
            key={c._id}
          >
            <Link to={`/category/${c.slug}`} className="btn cat-btn">
              {c.name}
            </Link>
          </div>
        ))}
      </div>
  );
};

export default Categories;
