import React from "react";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { LoginProvider } from "./context/LoginContext";

// ReactDOM.render(
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <SearchProvider>
  <CartProvider>
  <BrowserRouter>
  <LoginProvider>
  <App/>
    {/* <Routes>
      <Route path="/" element={<App />}>
        <Route path="/home" element={<HomePage/>} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/userProducts" element={<UserProducts/>} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />

          <Route path="/category/:slug" element={<CategoryProduct />} />
          <Route path="/searchResults" element={<SearchResult />} />

        <Route path="/dashboard">
            <Route path="user/profile" element={<Profile/>} />
            <Route path="user/orders" element={<Orders/>} />
          </Route>
          <Route path="/dashboard">
            <Route path="AdminDashBoard" element={<AdminDashBoard/>} />
            <Route
              path="AdminDashBoard/create-product"
              element={<CreateProduct/>}
            />
            <Route
              path="AdminDashBoard/create-category"
              element={<CreateCategory/>}
            />
            <Route
              path="AdminDashBoard/product/:slug"
              element={<UpdateProduct/>}
            />
            <Route path="AdminDashBoard/products" element={<Products/>} />
            <Route path="AdminDashBoard/orders" element={<AdminOrders/>} />
          </Route>

        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/cart" element={<CartPage/>} />
          <Route path="*" element={<PageNotFound/>} />
      </Route>
    </Routes> */}
    </LoginProvider>
  </BrowserRouter>
  </CartProvider>
  //  </SearchProvider>,
  
  
);
reportWebVitals();
