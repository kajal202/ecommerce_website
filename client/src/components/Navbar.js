import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import { useCart } from "../context/cart";
import useCategory from "../hooks/useCategory";
import { FaShoppingBag } from "react-icons/fa";
import SearchFrom from "./SearchFrom";
const Navbar = () => {
  const { Login, handleLogout } = useLogin();
  const [cart] = useCart();
  const categories = useCategory();

  const user = JSON.parse(localStorage.getItem("user-info"));
  // console.warn(user?.userFound?.name);

  return (
    <>
      <div className="Navbar" >
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className=" container-fluid ">
            <NavLink className="px-4 navbar-brand " to="/">
              <FaShoppingBag /> ShopKart
            </NavLink>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              id="navbarNavDropdown"
            >
              <SearchFrom/>

              <ul className=" navbar-nav">
                <li className="nav-item ">
                  <Link className="nav-link " to="/">
                    {" "}
                    HOME
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link " to="/userProducts">
                    Products
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link className="nav-link " to="/learn">
                   Learn
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Categories
                  </Link>
                  <ul className="dropdown-menu">
                    {categories?.map((c) => (
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/category/${c.slug}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {Login ? (
                  <>
                    <li className="nav-item dropdown">
                      <Link
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {Login && user?.userFound?.role === 1 ? (
                          <>Admin</>
                        ) : (
                          <>User</>
                        )}
                      </Link>
                      <ul className="dropdown-menu">
                        {user?.userFound?.role === 1 ? (
                          <>
                            <li>
                              <Link
                                className="dropdown-item"
                                to="/dashboard/AdminDashBoard"
                              >
                                DashBoard
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <li>
                              <Link
                                className="dropdown-item"
                                to="/dashboard/user/profile"
                              >
                                Profile
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item"
                                to="/dashboard/user/orders"
                              >
                                Your Orders
                              </Link>
                            </li>
                          </>
                        )}

                        <li>
                          <Link
                            className="dropdown-item"
                            to="/login"
                            onClick={handleLogout}
                          >
                            LOGOUT
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link " to="/SignIn">
                        Register/Login
                      </Link>
                    </li>
                  </>
                )}

                <li className="nav-item">
                  <Link className="nav-link black" to="/cart">
                    Cart {cart?.length}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
