import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import  Footer  from "./Footer";

function SignUp() {
  const navigate = useNavigate();
  const [User, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });
  let fieldName, value;
  const handleInputChange = (e) => {
    fieldName = e.target.name;
    value = e.target.value;
    setUser({ ...User, [fieldName]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, address } = User;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, phone, password, address }),
    });
    const json = await res.json();
    if (res.status === 200) {
      window.alert("User created successfully");
      navigate("/SignIn");
    } else {
      window.alert("Opps error");
    }
  };

  return (
    <>
    <Navbar/>
      <div className="p-5 SignUp  bg-light ">
        <div className="p-4 form">
          <div className="p-2 container border shadow rounded col-4 bg-white">
            <h2 className="text-center">Sign Up</h2>
            <hr />
            <form className="py-2">
              <div className=" form-group text-center">
                <label>Name: </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  name="name"
                  value={User.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="py-2 form-group text-center">
                <label>Email: </label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={User.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className=" form-group text-center">
                <label>Phone: </label>
                <input
                  name="phone"
                  type=" text"
                  className="form-control"
                  placeholder="Enter phone"
                  value={User.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className=" form-group text-center">
                <label>Password: </label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={User.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="py-2 form-group text-center">
                <label>Address: </label>
                <input
                  name="address"
                  type="text"
                  className="form-control"
                  placeholder="Enter address "
                  value={User.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="d-flex algin-items-center justify-content-center pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default SignUp;
