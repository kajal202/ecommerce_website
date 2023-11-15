import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import AdminMenu from "./AdminMenu";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  // const [auth, setAuth] = useLogin();

  const user = JSON.parse(localStorage.getItem("user-info"));
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) getOrders();
  }, [user]);
  // useEffect(() => {
  //   getOrders();
  // });
  // eslint-disable-next-line
  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/order-status/${orderId}`, {
        status: value,
      });
      getOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="row dashboard" style={{ paddingTop: "70px" }}>
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="p-3 col-md-9">
        <h1 className="text-center">All Orders</h1>

        {orders?.map((o, i) => {
          return (
            <div className="pt-4 px-3 border ">
              <table className="table border shadow">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Status</th>
                    <th scope="col">Buyer</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{o?.status}</td>
                    <td>{o?.buyer?.name}</td>
                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                    <td>{o?.products?.length}</td>
                  </tr>
                </tbody>
              </table>
              <div className="container">
                {o?.products?.map((p, i) => (
                  <div className="row mb-2 p-3 card flex-row" key={p._id}>
                    <div className="col-md-4">
                      <img
                        src={`/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        width="100px"
                        height={"100px"}
                      />
                    </div>
                    <div className="col-md-8">
                      <h5>{p.name}</h5>
                      <p>{p.description.substring(0, 30)}</p>
                      <h6 className="bold">Price : {p.price}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AdminOrders;
