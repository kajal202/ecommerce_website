import React, { useState } from "react";
import { useLogin } from "../context/LoginContext";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function SignIn() {
  const [LoginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const { handleLogin } = useLogin();
  let fieldName, value;
  const handleInputChange = (e) => {
    fieldName = e.target.name;
    value = e.target.value;
    setLoginDetails({ ...LoginDetails, [fieldName]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin(LoginDetails);
  };

  return (
    <>
    <Navbar/>
    <div className="p-5 SignIn  bg-light" >
      <div className="p-4 form">
      <div className="p-4 container-fluid col-4 border shadow rounded bg-white">
        <form>
          <h3>Sign In !</h3>
          <hr />
          <div className="py-2 form-group">
            <label>Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={LoginDetails.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="py-1 form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={LoginDetails.password}
              onChange={handleInputChange}
            />
          </div>

         

          <button
            type="submit"
            className=" btn btn-primary btn-block"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
        <div className=""> 
          <p className="pt-4">NEW HERE?</p>
          <a className="p-0 bg-light" href="./SignUp">Create new account </a>
        </div>
      </div>
    </div>
    </div>
    <Footer/>
    </>
  );
}

export default SignIn;
