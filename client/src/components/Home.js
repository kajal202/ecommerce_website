import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import axios from "axios";
import "../style/Home.css";

import { FaPercentage, FaShippingFast } from "react-icons/fa";
import { BiMap, BiMoney, BiMoneyWithdraw } from "react-icons/bi";
import Navbar from "./Navbar";
import Footer from "./Footer";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  // eslint-disable-next-line
  //get products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`/product-list/${page}`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <Navbar />
      <div className="px-2 pt-5 home-page">
        <div className="pt-2 container">
          <div
            className="text-center alert alert-light pt-1 pb-1"
            role="alert"
            style={{ backgroundColor: " rgb(242, 244, 244)" }}
          >
            <strong>Welcome!! Please fee free to connect!</strong>
          </div>
        </div>

        <div
          id="carouselExampleFade"
          className="px-2 p-0 carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner ">
            <div className="carousel-item active ">
              <img
                src="images/b-1.jpg"
                className="d-block w-100 "
                alt="bannerimage"
                width={"100%"}
                height={"380rem"}
              />
            </div>
            <div className="carousel-item ">
              <img
                src="images/b-3.jpg"
                className="d-block w-100"
                alt="bannerimage"
                width={"100%"}
                height={"380rem"}
              />
            </div>
            <div className="carousel-item">
              <img
                src="images/b-3.jpg"
                className="d-block w-100"
                alt="bannerimage"
                width={"100%"}
                height={"380rem"}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span className=" carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden ">Next</span>
          </button>
        </div>

        <div className="shadow p-5 pb-5 d-flex align-items-center justify-content-center bg-white ">
          <div
            className="border rounded-circle shadow"
            style={{
              paddingTop: "20px",
              height: "8rem",
              width: "8rem",
              borderRadius: "10px",
              backgroundColor: "aqua",
            }}
          >
            <h6 className="pt-2 text-center">Best offers</h6>
            <div
              className="p-0"
              style={{
                fontSize: 30,
                display: "grid",
                justifyContent: "center",
              }}
            >
              <FaPercentage />
            </div>
          </div>

          <div
            className="border text-center rounded-circle shadow"
            style={{
              paddingTop: "20px",
              height: "8rem",
              marginLeft: "90px",
              width: "8rem",
              borderRadius: "10px",
              backgroundColor: "aqua",
            }}
          >
            <h6 className="pt-2 text-center"> Free Shipping</h6>
            <div
              className=""
              style={{
                fontSize: 30,
                display: "grid",
                justifyContent: "center",
              }}
            >
              <FaShippingFast />
            </div>
          </div>

          <div
            className=" border rounded-circle shadow"
            style={{
              paddingTop: "10px",
              height: "8rem",
              marginLeft: "90px",
              width: "8rem",
              borderRadius: "10px",
              backgroundColor: "aqua",
            }}
          >
            <h6 className="pt-2 text-center"> Best Price Guarantee</h6>
            <div
              className=""
              style={{
                fontSize: 30,
                display: "grid",
                justifyContent: "center",
              }}
            >
              <BiMoneyWithdraw />
            </div>
          </div>

          <div
            className="p-2 border shadow rounded-circle shadow"
            style={{
              paddingTop: "20px",
              height: "8rem",
              marginLeft: "90px",
              width: "8rem",
              borderRadius: "10px",
              backgroundColor: "aqua",
            }}
          >
            <h6 className="pt-2 text-center"> Track your order</h6>
            <div
              className=""
              style={{
                fontSize: 30,
                display: "grid",
                justifyContent: "center",
              }}
            >
              <BiMap />
            </div>
          </div>

          <div
            className="p-2 border rounded-circle shadow"
            style={{
              paddingTop: "20px",
              height: "8rem",
              marginLeft: "90px",
              width: "8rem",
              borderRadius: "10px",
              backgroundColor: "aqua",
            }}
          >
            <h6 className="pt-2 text-center"> Quality products</h6>
            <div
              className=""
              style={{
                fontSize: 30,
                display: "grid",
                justifyContent: "center",
              }}
            >
              <BiMoney />
            </div>
          </div>
        </div>

        <div className="p-2">
          <h2 className="p-3 text-center ">Best Products Here</h2>
          <div className="pb-4 px-2  d-flex flex-wrap  border-shadow products">
            {products?.map((p, index) => (
              <div className="card m-2 border" key={p._id}>
                <img
                  src={`/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {/* {p.price} */}
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        window.alert("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-3 All_products_button ">
          <a href="./userProducts" className=" shadow btn btn-dark">
            See All
          </a>
        </div>

        <div className="p-4 kids_women bg-white">
          <h3 className="px-3 text-start">Kids & women</h3>
          <div className="shadow py-4 d-flex new-collection justify-content-center">
            <div className="py-2 card m-2 border" style={{ width: "18rem" }}>
              <img
                src="/images/women_suit.jpg"
                className="p-3  d-block w-30 pt-0 "
                style={{ height: "11rem" }}
                alt="bannerimage"
              />
              <div className="card-body text-center">
                <h5 className="card-title text-center"> Women suit</h5>
                <p className="card-text discription">collections women dress</p>
                <div className="px-4 ">
                  <button
                    className=" btn btn-info"
                    onClick={() => navigate(`/category/Female`)}
                  >
                    See More
                  </button>
                </div>
              </div>
            </div>

            <div className="p-2 card m-2 border" style={{ width: "18rem" }}>
              <img
                src="/images/kids_girls.jpg"
                className="p-3  d-block w-30 "
                style={{ height: "11rem" }}
                alt="bannerimage"
              />
              <div className="card-body text-center">
                <h5 className="card-title text-center"> kids-dress</h5>
                <p className="card-text discription">Baby girls dress</p>
                <button
                  className="px-4 btn btn-info"
                  onClick={() => navigate(`/category/kids`)}
                >
                  See More
                </button>
              </div>
            </div>

            <div className="card m-2 border" style={{ width: "18rem" }}>
              <img
                src="/images/girl_kid.jpeg"
                className="p-3  d-block w-30 pt-0 "
                style={{ height: "11rem" }}
                alt="bannerimage"
              />
              <div className="card-body text-center">
                <h5 className="card-title text-center"> princess dress</h5>
                <p className="fs-6  discription">
                  Party wear dress for princess girls
                </p>
                <button
                  className="px-4 btn btn-info"
                  onClick={() => navigate(`/category/Female`)}
                >
                  See More
                </button>
              </div>
            </div>

            <div className="card m-2 border " style={{ width: "18rem" }}>
              <img
                src="/images/women_dress.webp"
                className="p-3  d-block w-30 pt-0 "
                style={{ height: "11rem" }}
                alt="bannerimage"
              />
              <div className="card-body text-center">
                <h5 className="card-title text-center"> western-outfit</h5>
                <p className="fs-6  discription">Stlylish dress for girls</p>
                <button
                  className="px-4 btn btn-info "
                  onClick={() => navigate(`/category/men`)}
                >
                  See More
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 ">
          <div className="p-3 bg-white ">
            <h3 className="px-5">Latest Collection</h3>
            <div className=" me-2 bg-white py-2 d-flex new-collection justify-content-center">
              <div className="py-2 card m-2 border" style={{ width: "22rem" }}>
                <img
                  src="/images/latest1.jpg"
                  className="p-3  d-block w-30 pt-0 "
                  style={{ height: "14rem" }}
                  alt="bannerimage"
                />
                <div className="card-body text-center">
                  <h5 className="card-title text-center"> Women Wrist Watch</h5>
                  <p className="card-text discription">
                    New collection of Analog New Titan Women Wrist Watch
                  </p>
                </div>
              </div>

              <div className="p-2 card m-2 border" style={{ width: "22rem" }}>
                <img
                  src="/images/latest2.jpg"
                  className="p-3  d-block w-30 pt-0 "
                  style={{ height: "14rem" }}
                  alt="bannerimage"
                />
                <div className="card-body text-center">
                  <h5 className="card-title text-center">
                    {" "}
                    kids-shoes-Royalty
                  </h5>
                  <p className="card-text discription">
                    latest kids-shoes-Royalty
                  </p>
                </div>
              </div>

              <div className="card m-2 border" style={{ width: "22rem" }}>
                <img
                  src="/images/latest3.jpg"
                  className="p-3  d-block w-30 pt-0 "
                  style={{ height: "14rem" }}
                  alt="bannerimage"
                />
                <div className="card-body text-center">
                  <h5 className="card-title text-center"> Sports Shoe</h5>
                  <p className="fs-6  discription">
                    bROOKE mENS Stylish Eva Light Wheights Sports Shoe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="p-4 px-5  text-light"
          style={{ background: "rgb(78, 78, 78)" }}
        >
          <div className="container ">
            <div className="d-flex align-items-center justify-content-between">
              <h3 className="px-5">FAQ !</h3>
              <div className="px-5 input-group email-subscription">
                <input
                  type="email "
                  name="email "
                  className="p-2 form-control"
                  id="subscription-email "
                  placeholder="Please enter your query "
                />
                <button className="btn btn-dark border btn">Submit</button>
              </div>
            </div>
          </div>
        </div>

        <hr />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
