import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import  Footer  from "./Footer";
function PageNotFound() {
  return (
    <>
    <Navbar/>
    <div className="pageNotFound text-center" style={{ minHeight: "90vh" }}>
      <h1> Page Not Found</h1>
      <Link to="/">GO BACK TO HOME</Link>
    </div>
    <Footer/>
    </>
  );
}

export default PageNotFound;
