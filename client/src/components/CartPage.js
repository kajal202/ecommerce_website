import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { useLogin } from "../context/LoginContext";
import "../style/Cart.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
const CartPage = () => {
  const { Login } = useLogin();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user-info"));
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
   if(Login) getToken();
  },[Login] );

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/braintree/payment", {
        nonce,
        cart,
      });
      console.log(data)
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      window.alert("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="py-5 cart-page">
      <div className="py-2 row">
        <div className="col-md-12">
          <h4 className="text-center bg-light pb-1  mb-1">
            {!Login ? "Hello Guest" : `Hello  ${user?.userFound?.name}`}
            <p className="text-center p-0">
              {cart?.length? `You Have ${cart?.length} items in your cart ${
                    user?.userFound ? "" : "please login to checkout !"
                  }`
                : " Your Cart Is Empty"}
            </p>
          </h4>
        </div>
      </div>
      <div className="p-0 container">
        <div className="row">
          <div className="col-md-6 p-0 m-0">
            {cart?.map((p) => (
              <div className="row card flex-row " key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100%"
                    height={"130px"}
                  />
                </div>
                <div className="col-md-4">
                  <h6>{p.name}</h6>
                  <p>{p.description.substring(0, 30)}</p>
                  <p className="fw-bold">Price : {p.price}</p>
                </div>
                <div className="col-md-4 cart-remove-btn">
                  <button
                    className="btn btn-danger pt-2"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-5 cart-summary ">
            <h5>Cart Summary</h5>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h5>Total : {totalPrice()} </h5>
             {Login? (
              <>
                <div className="pt-2 mb-3">
                  <h5>Current Address</h5>
                  <p>{user?.userFound?.address}</p>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {Login? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/SignIn", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!Login || !clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance } //|| !Login?.user?.address
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CartPage;
