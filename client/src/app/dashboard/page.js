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

    const [userDetails, setUserDetails] = useState({email:"",name:"", lightTheme:true, subjects:[]});
    const [subjects, setSubjects] = useState([{name:"", description:"", chapters:[], createdAt:""}]);
    const [mobileNav, setMobileNav] = useState(false);

    function trgrMobileNav(){
      setMobileNav(!mobileNav);
    }

    function trgrMobileNavOff(){
 
    }

    async function trgrModeChange(){
      setUserDetails((prev)=>{
        return {...prev, lightTheme:!prev.lightTheme}
      })
      const unp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/theme`, {method:"PATCH",credentials:"include", headers: { "Content-Type": "application/json"}, body: JSON.stringify({theme:!userDetails.lightTheme})});
      const pr = await unp.json();
    }

    async function getCredentials() {
        const un = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`,{method:"GET", credentials:"include", headers: { "Content-Type": "application/json"}});
        const pr = await un.json();
        console.log(pr);
        if(pr.status && pr.body.isVerified){
            setUserDetails({
              email:pr.body.email,
              name:pr.body.name,
              lightTheme:pr.body.lightTheme,
              subjects:pr.body.subjects || []
            });
            console.log(pr);
            return;
        }
        router.push("/auth/signin");
    }

    async function getAllSubjects(){
      const un = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subjects`,{method:"GET", credentials:"include", headers: { "Content-Type": "application/json"}});
      const pr = await un.json();
      if(pr.status){
        setSubjects(pr.body);
      } else {
        console.log("Failed to fetch subjects");
      }     
    }
    
    useEffect(()=>{
      getCredentials();
      getAllSubjects();
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
                     <ul className="flex flex-row  w-full box-border gap-2 px-10">
                        <li className=" transition-all flex  items-center box-border cursor-pointer border-green-800 border border-[#ffffff00] text-nowrap px-4 py-1 rounded-[4px]" onClick={trgrModeChange} >
                             <img src={`${(userDetails.lightTheme)?"/darkModeIcon.png":"/lightModeIcon.png"}`} className="h-5"/>
                        </li>  
                        <Link type="button" href={"/auth/signin"} className=" transition-colors text-nowrap px-4 py-2 rounded-[4px]  text-white hover:border-green-800 hover:bg-amber-50 hover:text-green-800 border border-[#ffffff00]  bg-green-800  cursor-pointer"  onClick={trgrSignOut}>Sign Out</Link> 
                     </ul>
                 </div>
            </nav>     
        </header>

        <section className="h-fit w-full flex flex-col items-center justify-center px-1.5 py-20"  >                      
                 <ul className="w-full max-w-3xl flex flex-col gap-5">
                    {
                      (userDetails.subjects.length === 0) ? <p className="text-center text-gray-500">No Subjects Found. Please Add a Subject.</p> : userDetails.subjects.map((subject, index)=>{
                        return (
                          <li key={index} className="w-full flex flex-col gap-2 p-5 rounded-lg border border-gray-300">   
                              <div className="w-full flex items-center justify-between">
                                  <h2 className="text-xl font-bold">{subject.name}</h2>
                                  <p className="text-sm text-gray-500">{new Date(subject.createdAt).toLocaleDateString()}</p>   
                            </div>  
                        </li>
                      )
                     })
                    }
                 </ul>    
        </section>

        <section className="h-fit w-full flex flex-col items-center justify-center px-1.5 py-20">
                 <h1 className="p-4">Subjects Available</h1>
                 <ul className="w-full  flex  gap-5">
                    {
                      (subjects.length === 0) ? <p className="text-center text-gray-500">No Subjects Found.</p> : subjects.map((subject, index)=>{
                        return (  
                          <li key={index} className={`w-full flex flex-col gap-2 p-5 rounded-lg border border-gray-300 ${(userDetails.lightTheme)?"hover:shadow-md transition-shadow cursor-pointer":"hover:shadow-md shadow-amber-50 transition-shadow cursor-pointer"}`} onClick={()=>router.push(`/dashboard/subject/${subject._id}`)}>
                              <div className="w-full flex items-center justify-between">
                                  <h2 className="text-xl font-bold">{subject.name}</h2>
                                  <p className="text-sm text-gray-500">{new Date(subject.createdAt).toLocaleDateString()}</p> 
                            </div>
                            <p>{subject.description}</p>
                        </li>
                        )
                      }
                      )
                      }
                 </ul>
        </section>
        

      </main>
    )
}