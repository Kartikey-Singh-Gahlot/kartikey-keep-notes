"use client";
import Logo from "../components/logo";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HamBurgerMenu } from "../components/hamBurgerMenu";
import { HomeNavBar } from "../components/navBar";
import Link from "next/link";
import "./dashboard.css";

export default function Dashboard(){

    const router = useRouter();

    const [userDetails, setUserDetails] = useState({email:"",name:"", lightTheme:true, notes:[]});
    const [lightTheme, setLightTheme] = useState(true);

    const [mobileNav, setMobileNav] = useState(false);

    function trgrMobileNav(){
      setMobileNav(!mobileNav);
    }

    function trgrMobileNavOff(){
 
    }

    async function trgrModeChange(){
      const newTheme = !lightTheme;
      setLightTheme(newTheme);
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/guest`, {method:"POST",credentials:"include", headers: { "Content-Type": "application/json"}, body: JSON.stringify({lightTheme:newTheme})});
 
    }
    
    useEffect(()=>{
      async function getCredentials() {
        const un = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`,{method:"GET", credentials:"include", headers: { "Content-Type": "application/json"}});
        const pr = await un.json();
        console.log(pr);
        if(pr.status){
            setUserDetails(pr.body);
            return;
        }
       
      }
      getCredentials();
    },[])

    async function trgrSignOut(){
        const un = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/signout`,{ method:"POST", credentials:"include", headers: { "Content-Type": "application/json"}});
        const pr = await un.json();
        if(pr.status){
          router.push("/auth/signin");
        }
    }

    return(
      <main className={`pageWrapper ${(userDetails.lightTheme)?"lightTheme":"darkTheme"} transition-colors font-semibold `} onClick={trgrMobileNavOff}>
        <header className={`${(userDetails.lightTheme)?"lightTheme":"darkTheme"} fixed w-full flex px-5 py-3 items-center box-border  transition-colors`}>
            <div className="w-full"><Logo/></div>
            
            <nav className="pl-2 px-2 flex min-[780px]:flex-row flex-col justify-end items-center box-border w-full " >
                 <div className="min-[780px]:w-fit w-full flex justify-end "> 
                      <HamBurgerMenu trgrMobileNav={trgrMobileNav} mobileNav={mobileNav}/>
                 </div>

                 <div className={`min-[780px]:flex min-[780px]:relative ${(mobileNav)? `${(userDetails.lightTheme)?"lightTheme":"darkTheme"}  flex absolute top-12  py-10 gap-10 left-0 w-full  items-start border-b-2 border-b-green-800`:"hidden" }  min-[780px]:flex-row flex-col`}>
                     <HomeNavBar items={["Home", "About", "Contact"]} itemLinks={["#home", "#about", "#contact"]} />
                     <ul className="flex flex-row  w-full box-border gap-2 px-10">
                        <li className=" transition-all flex  items-center box-border cursor-pointer border-green-800 border border-[#ffffff00] text-nowrap px-4 py-1 rounded-[4px]"onClick={trgrModeChange} >
                             <img src={`${(userDetails.lightTheme)?"/darkModeIcon.png":"/lightModeIcon.png"}`} className="h-5"/>
                        </li>  
                        <Link type="button" href={"/auth/signin"} className=" transition-colors text-nowrap px-4 py-2 rounded-[4px]  text-white hover:border-green-800 hover:bg-amber-50 hover:text-green-800 border border-[#ffffff00]  bg-green-800  cursor-pointer"  onClick={trgrSignOut}>Sign Out</Link> 
                     </ul>
                 </div>
            </nav>     
        </header>

        <section className="h-fit w-full flex flex-col items-center justify-center px-1.5 py-20"  >                      
                      <ul className="w-full flex">
                          {(userDetails.notes.length>0)?userDetails.notes.map((i, idx)=>{ return <li className="border border-green-600 rounded-3xl flex flex-col gap-2 px-2 py-5" key={idx}><h1 className=" w-full text-center text-2xl">{i.notesTitle}</h1><p className="">{i.notesContent}</p></li>}):"Nothing to show here"}
                      </ul>
        </section>
        

      </main>
    )
}