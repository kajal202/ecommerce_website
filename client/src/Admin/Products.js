import { React, useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/get-product");
      setProducts(data.products);
    } catch (error) {
      window.alert("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
    <Navbar/>
    <div
      className="d-grid admin-products"
      style={{ minHeight: "90vh", paddingTop:"40px"}}
    >
      <div className="row dashboard mt-2 m-1 pt-4 ">
        <div className="p-2" style={{width: "273px", }}>
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="pt-2 pb-3 text-center"> All Products List</h1>
          <div className="pb-2  d-flex flex-wrap" >
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/AdminDashBoard/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-1 mt-2 " style={{ width: "15rem" }}>
                  <img
                    src={`/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    height="160rem"
                  />
                  <div className="card-body">
                    <h6 className="card-title">{p.name}</h6>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Products;
