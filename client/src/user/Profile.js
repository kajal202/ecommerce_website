import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Profile = () => {
  const navigate = useNavigate();
  const { Login } = useLogin();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // eslint-disable-next-line
  const [user, setUser] = useState("Loading");
    const getSecretData= async () => {
         const res = await fetch('/profile-data',{
            method : "GET",
            headers : {
              'content-type' : 'application/json',
              'Accept' : "application/json",
            },
            credentials : "include",
            
         });
         const json = await  res.json();
          setUser(json);    
          console.log(json);
    };

     useEffect( ()=>{
         getSecretData();
     },[]);
  useEffect(() => {
    getSecretData()
    const { name, email, phone, password, address } = user;
    

    setName(name);
    setEmail(email);
    setPhone(phone);
    setPassword(password);
    setAddress(address);
  }, []);
  // eslint-disable-next-line

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        window.alert(data?.error);
      } else {
        setUser(data?.updatedUser);
        window.alert("Profile Updated Successfully");
        navigate("/dashboard/user/profile");
      }
    } catch (error) {
      console.log(error);
      window.alert("Something went wrong");
    }
  };

  return (
    <>
   <Navbar/>
    <div className="profile" style={{ minHeight: "100vh", marginTop:"-16px"}}>
      <div className="container-fluid m-3 p-2 d-flex align-items-center justify-content-center ">
        <div className="pt-5 row  form-container" >
          <h4 className="pt-5 title text-center">USER PROFILE</h4>
          <div className="p-3 mb-3 ">
            <div className="text-center border shadow py-3 px-5 user-data border fs-4">
              Name: {user?.name} 
              <br />
              EMail: {user?.email}
              <br />
              phone no: {user?.phone}
              <br />
              address: {user?.address}
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="button"
              class="btn btn-primary "
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              UPDATE
            </button>
          </div>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Modal title
                  </h5>
                </div>
                <div class="modal-body">
                  <form>
                    <h4 className="title">USER PROFILE</h4>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Your Name"
                        autoFocus
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Your Email "
                        disabled
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control"
                        id="exampleInputEmail1"
                        placeholder="Enter Your Phone"
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Enter Your Password"
                      />
                    </div>
                    
                    <div className="mb-3">
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control"
                        id="exampleInputAddress"
                        placeholder="Enter Your Address"
                      />
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    UPDATE
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Profile;
