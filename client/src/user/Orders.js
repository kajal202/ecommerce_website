import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLogin } from './../context/LoginContext';
import Navbar from "../components/Navbar";
import Footer from './../components/Footer';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const {Login} = useLogin();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/orders");
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Login) getOrders();
  }, [Login]);
  return (
    <>
    <Navbar/>
      <div className=" user-orders" style={{minHeight: "80vh", 
       }}>
        <div className="container " style={{ paddingTop:"50px"}}>
            <h1 className="p-3 text-center">All Orders</h1>
            {orders?.map((o, i) => {
               return (
                <div className="border ">
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

export default Orders;