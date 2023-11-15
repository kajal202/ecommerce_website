import React from "react";
import {  NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="p-2 border  text-center">
        <div className="p-1 list-group dashboard-menu" style={{height: "80vh"}}>
          <h4>Admin Panel</h4>

          <hr className="text-secondary"/>
          <NavLink to="/dashboard/AdminDashBoard" className=" list-group-item list-group-item-action">
           Dashboard
          </NavLink>
          <NavLink to="/dashboard/AdminDashBoard/create-category" className="list-group-item list-group-item-action ">
            Create Category
          </NavLink>
          <NavLink to="/dashboard/AdminDashBoard/create-product" className="list-group-item list-group-item-action ">
            Create Product
          </NavLink>
          <NavLink to="/dashboard/AdminDashBoard/products" className="list-group-item list-group-item-action">
            Products
          </NavLink>
          <NavLink to="/dashboard/AdminDashBoard/orders" className="list-group-item list-group-item-action">
            Orders
          </NavLink>
          
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
