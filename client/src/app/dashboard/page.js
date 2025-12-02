"use client";
import Logo from "../components/logo";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard(){

    const router = useRouter();

    let [userDetails, setUserDetails] = useState([]);
    
    useEffect(()=>{
      async function getCredentials() {
        const un = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/util/user`,{method:"GET", credentials:"include", headers: { "Content-Type": "application/json"}});
        const pr = await un.json();
        console.log(pr);
        if(pr.status){
            setUserDetails(pr.body);
            return;
        }
        router.push("/auth/signin");
      }
      getCredentials();
    },[])

    async function trgrSignOut(){
        const un = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/signout`,{ method:"GET", credentials:"include", headers: { "Content-Type": "application/json"}});
        const pr = await un.json();
        if(pr.status){
          router.push("/auth/signin");
        }
    }

    return(
        <main>
            <header>
                   <Logo/>
            </header>
            <h1>Dashboard</h1>
            <h1>{userDetails.name}</h1>

            <button type="button" onClick={trgrSignOut}>
                   SignOut
            </button>

        </main>
    )
}