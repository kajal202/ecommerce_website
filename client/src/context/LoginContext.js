import React from "react";
import { useNavigate } from "react-router-dom";
const { createContext, useContext, useState } = require("react");

export const LoginContext = createContext();
export const LoginProvider = ({ children }) => {
  const [Login, setLogin] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line
  const handleLogout = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      setLogin(false);
      localStorage.clear("user-info");
      navigate("/");

      window.alert("User Logged Out");
    } catch (err) {
      window.alert("Opps ! error occured");
    }
  };

  const handleLogin = async (LoginDetails) => {
    const { email, password } = LoginDetails;
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (res.status === 200) {
      setLogin(true);
      localStorage.setItem("user-info", JSON.stringify(json));
      navigate("/");
      window.alert("Login Successfull!");
    } else {
      window.alert("Invalid credentials");
    }
  };

  return (
    <LoginContext.Provider value={{ Login, handleLogout, handleLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => {
  return useContext(LoginContext);
};
