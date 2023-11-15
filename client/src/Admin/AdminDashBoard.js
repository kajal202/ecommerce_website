import React from "react";
import AdminMenu from "./AdminMenu";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminDashBoard = () => {
  const user = JSON.parse(localStorage.getItem("user-info"));

  return (
    <>
    <Navbar/>
    <div className="Dashboard" style={{ minHeight: "90vh" , marginTop:"-16px"}}>
      <div className="conatiner-fluid m-3 p-3" >
        <div className="row" style={{paddingTop: "60px"}}>
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="p-4 col-md-9">
            <h1 className="p-3 text-center"> Admin DashBoard</h1>
            <div className="text-center fs-5 p-3 border w-70 ">
              <p > Admin Name : {user?.userFound?.name} </p>
              <p> Admin Email : {user?.userFound?.email}</p>
              <p> Admin Contact :{user?.userFound?.phone} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AdminDashBoard;
