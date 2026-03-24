import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="container my-4">
      <h3 className="fw-bold">Explore Categories</h3>
      <ul className="list-unstyled">
        <li><Link to="/products?category=Wedding" className="text-dark">Wedding</Link></li>
        <li><Link to="/products?category=Birthday" className="text-dark">Birthday</Link></li>
        <li><Link to="/products?category=Corporates" className="text-dark">Corporates</Link></li>
        <li><Link to="/products?category=Inauguration" className="text-dark">Inauguration</Link></li>
      </ul>
    </div>
  );
};

export default Categories;
