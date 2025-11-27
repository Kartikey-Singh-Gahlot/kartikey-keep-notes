"use client";
import Logo from "../components/logo";
import { useState, useEffect } from "react";

export default function Dashboard(){

    let [userDetails, setUserDetails] = useState([]);
    
    useEffect(()=>{
      async function getCredentials() {
        const un = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/util/user`,{ credentials:"include", headers: { "Content-Type": "application/json"}});
        const pr = await un.json();
        console.log(pr);
        if(pr.status){
            setUserDetails(pr.body);
        }
      }
      getCredentials();
    },[])
    return(
        <main>
            <header>
                   <Logo/>
            </header>
            <h1>Dashboard</h1>
            <h1>{userDetails.name}</h1>
            <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}>
                Continue with Google
           </a>
        </main>
    )
}