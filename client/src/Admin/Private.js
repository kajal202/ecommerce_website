import { useEffect, useState } from "react";
import { Outlet, useNavigate} from "react-router-dom";
import { useLogin } from "../context/LoginContext";

export default function Private() {
 const navigate= useNavigate();
  const { Login } = useLogin();
  const [user, setUser]= useState(" ");
  const User = JSON.parse(localStorage.getItem("user-info"));


  const checkUser = async () => {
    const res = await fetch("/auth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    });
    const json = await res.json();
    setUser(json);
  };

  useEffect(() => {
    checkUser();
  }, [Login]);

  if(user==='Loading'){
    return <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
          </div>
  }else if(User.role===1){
    return <Outlet/>
  }else{
    return navigate('./pageNotFound');
  }
}
