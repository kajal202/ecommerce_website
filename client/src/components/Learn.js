import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Footer from './Footer';
const Learn=() => {
    const [user, setUser] = useState("Loading");
    const getSecretData= async () => {
         const res = await fetch('/Learn',{
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

    return (
      <>
      <Navbar/>
        <div className="p-5 home" style={{minHeight: "80vh"}}>
           {
        user ==='Loading' ? <h1>Loading</h1>: <h1>{user.name}</h1>
          }
      
       </div>
       <Footer/>
       </>
    );
  }

export default Learn;