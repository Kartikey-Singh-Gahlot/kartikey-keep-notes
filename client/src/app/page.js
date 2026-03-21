"use client";
import {HomeNavBar} from "./components/navBar.js";
import Link from "next/link.js";
import Features from "./components/features.js";
import Logo from "./components/logo.js";
import "./globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation.js";
import { HamBurgerMenu } from "./components/hamBurgerMenu.js";
import ContactForm from "./components/contactForm.js";


export default function Home() {


   const router = useRouter();

   let [lightTheme, setLightTheme] = useState(true);
   let [mobileNav, setMobileNav] = useState(false);
   let [subjects, setSubjects] = useState([{name:"", description:"", chapters:[], createdAt:""}]);


   async function trgrModeChange(){
     const newTheme = !lightTheme;
     setLightTheme(newTheme);
     await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/guest`, {method:"POST",credentials:"include", headers: { "Content-Type": "application/json"}, body: JSON.stringify({lightTheme:newTheme})});
   }

   async function checkTheme(){
      const unp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/guest/theme`, {method:"GET",credentials:"include", headers: { "Content-Type": "application/json"}});
      const pr = await unp.json();
      if(pr.body.lightTheme==false){
        setLightTheme(!lightTheme);
      }
   }

   async function checkAuth(){
     const unp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {method:"GET", credentials:"include", headers:{"Content-Type":"application/json"}});
     const pr = await unp.json();
     if(pr.status){
       router.push("/dashboard");
     }
   }

   function trgrMobileNav(){
     setMobileNav(!mobileNav);
   }

   function trgrMobileNavOff(){
     if(mobileNav){
        setMobileNav(false);
     }
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

   function handleResize(){
      if (window.innerWidth > 780) {
        setMobileNav(false);
      }
   }


   useEffect(()=>{
     handleResize();
     checkTheme();
     checkAuth();
     getAllSubjects();
     window.addEventListener("resize", handleResize);
   },[]);


  return (
   <main className={`pageWrapper ${(lightTheme)?"lightTheme":"darkTheme"} transition-colors font-semibold`} onClick={trgrMobileNavOff}>
         <header className={`${(lightTheme)?"lightTheme":"darkTheme"} fixed w-full flex px-5 py-3 items-center box-border  transition-colors`}>
                <div className="w-full"><Logo/></div>

                <nav className="pl-2 px-2 flex min-[780px]:flex-row flex-col justify-end items-center box-border w-full " >
                    <div className="min-[780px]:w-fit w-full flex justify-end "> 
                         <HamBurgerMenu trgrMobileNav={trgrMobileNav} mobileNav={mobileNav}/>
                    </div>
                    <div className={`min-[780px]:flex min-[780px]:relative ${(mobileNav)? `${(lightTheme)?"lightTheme":"darkTheme"}  flex absolute top-12  py-10 gap-10 left-0 w-full  items-start border-b-2 border-b-green-800`:"hidden" }  min-[780px]:flex-row flex-col`}>
                        <HomeNavBar items={["Home", "About", "Contact"]} itemLinks={["#home", "#about", "#contact"]} />
                
                        <ul className="flex flex-row  w-full box-border gap-2 px-10">
                           <li className=" transition-all flex  items-center box-border cursor-pointer border-green-800 border  text-nowrap px-4 py-1 rounded-[4px]"onClick={trgrModeChange} >
                                <img src={`${(lightTheme)?"/darkModeIcon.png":"/lightModeIcon.png"}`} className="h-5"/>
                           </li>  
                           <Link  href={"/auth/signin"} className=" transition-colors text-nowrap px-4 py-2 rounded-[4px]  text-white hover:border-green-800 hover:bg-amber-50 hover:text-green-800 border border-[#ffffff00]  bg-green-800  cursor-pointer">Get Started</Link>   
                        </ul>
                    </div>
                </nav>
         </header>


         <section className="h-fit w-full flex flex-col items-center px-1.5 py-10" id="home">

                <div className="w-full flex  flex-col justify-center py-10">
                    <h1 className="w-full text-center min-[780px]:text-7xl     min-[500px]:text-5xl text-2xl px-2 py-3">Learn with Kartz. Track Your Growth</h1>
                    <h6 className="w-full text-center min-[780px]:text-[15px]  min-[500px]:text-[12px] text-[10px] px-2 py-5">Access structured notes, follow along with YouTube lessons, and track your progress — all in one place.</h6>
                </div>

                <div className="flex flex-col items-center justify-center  rounded-t-2xl rounded-b-[10px]  to-[white]  gap-5 ">
                    <img src="/mainBgBlackImageOne.png" className="min-[780px]:h-90 h-70"/>
                    <div className="w-full flex  justify-center gap-5 items-center">
                          <h1 className="text-center">Start Noting</h1>
                          <button><Link href={`auth/signin`} className=" transition-colors text-nowrap px-4 py-2 rounded-[4px]  text-white hover:border-green-800 hover:bg-amber-50 hover:text-green-800 border border-[#ffffff00]  bg-green-800  cursor-pointer" >Get Started</Link></button>
                    </div> 
                </div>

          </section>

           <section className=" h-fit px-4  py-7 flex flex-col justify-center" id="about">                
            
                <h1 className="w-full  text-4xl py-5">Why Choose Keep Notes?</h1>
                <p className="px-2 py-2 text-[10px] min-[780px]:text-[15px] ">Keep Notes makes it effortless to organize your thoughts and ideas. Whether it’s a quick note or an important reminder, everything stays just a click away.</p>
                <ul className="flex gap-2 w-full">
                   {
                      subjects.map((subject, index)=>{
                        return (  
                          <li key={index} className={`min-w-[400px] transition-colors text-nowrap px-4 py-2 rounded-[4px]  text-white hover:border-green-800 hover:bg-amber-50 hover:text-green-800 border border-[#ffffff00]  bg-green-800  cursor-pointer`}>
                              <div className="w-full flex items-center justify-between">
                                  <h2 className="text-xl font-bold underline">{subject.name}</h2>
                                  <p className="text-sm text-gray-500">{new Date(subject.createdAt).toLocaleDateString()}</p> 
                            </div>
                            <p>{subject.description}</p>
                            <button className="w-full flex items-center"><Link href={`auth/signin`} className="w-full transition-colors text-nowrap px-4 py-2 rounded-[4px]  text-green-800 bg-amber-50 hover:border-green-800 hover:bg-amber-green-800 border  cursor-pointer" >Start</Link></button>
                        </li>
                        )
                      }
                      )
                   }
                </ul>  
            </section>

            <div className="w-full px-10">
              <hr className={`w-full h border ${(lightTheme)?"border-[#00000018]":"border-[#ffffff25]"}`}/>
            </div>

             <section className=" h-fit w-full px-4 " id="contact">
                   
                   <h1 className="w-full  py-4 px-2 text-center text-4xl">Get In Touch</h1>
                    <div className="w-full flex justify-center">
                         <p className="px-1 py-5 text-[10px] min-[780px]:text-[15px] text-left">Your feedback helps us grow and improve. If you have suggestions, feature requests, or want to collaborate, we’re just a message away.</p>
                    </div>

                   <div className="flex w-full justify-center py-2">
                        <ContactForm lightTheme={lightTheme}/>
                   </div>
                    
                   

                   <footer className=" h-fit flex flex-col py-2 justify-center ">
                       <ul className=" flex w-full justify-center gap-5 py-2">
                          <li className="h-fit"><a className="text-[13px] flex items-center gap-1"  target="_blank" href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSHxjdKGSFjBdMXjKFbqcFvvwmVlJVFZKGtdGBSmmhdpWpmdXpkfkvmzHhWXZSwtTHLckcpq"><img src={(lightTheme)?"/mailBlackIcon.png":"/mailIcon.png"} className="h-5"/>Email</a></li>
                          <li className="h-fit"><a className="text-[13px] flex items-center gap-1"  target="_blank" href="https://www.linkedin.com/in/kartikey-singh-gahlot-58020124b/"><img src={(lightTheme)?"/linkedInBlackIcon.png":"/linkedInIcon.png"} className="h-5"/>LinkedIn</a></li>
                          <li className="h-fit"><a className="text-[13px] flex items-center gap-1"  target="_blank" href="https://github.com/Kartikey-Singh-Gahlot"><img src={(lightTheme)?"/gitHubBlackIcon.png":"/gitHubIcon.png"} className="h-5"/>GitHub</a></li>
                       </ul>
                       <h1 className={`w-full text-center text-[10px] py-2 ${(lightTheme)?"text-gray-400":"text-gray-500"}`}>© 2025 Keep Notes. All rights reserved.</h1>
                   </footer>
            </section>

   </main>
  );
}
