"use client";
import {HomeNavBar} from "./components/navBar.js";
import Link from "next/link.js";
import Features from "./components/features.js";
import Logo from "./components/logo.js";
import "./globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation.js";
import { motion } from "framer-motion";
import { HamBurgerMenu } from "./components/hamBurgerMenu.js";



export default function Home() {


   const router = useRouter();

   let [lightTheme, setLightTheme] = useState(true);
   let [mobileNav, setMobileNav] = useState(false);

   async function trgrModeChange(){
     const newTheme = !lightTheme;
     setLightTheme(newTheme);
     await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/guest`, {method:"POST",credentials:"include", headers: { "Content-Type": "application/json"}, body: JSON.stringify({lightTheme:newTheme})});
   }

   async function checkTheme() {
      const unp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/util/theme`, {method:"GET",credentials:"include", headers: { "Content-Type": "application/json"}});
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

   function handleResize(){
      if (window.innerWidth > 780) {
        setMobileNav(false);
      }
   }


   useEffect(()=>{
     handleResize();
     checkTheme();
     checkAuth();
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
                           <li className=" transition-all flex  items-center box-border cursor-pointer border-green-800 border border-[#ffffff00] text-nowrap px-4 py-1 rounded-[4px]"onClick={trgrModeChange} >
                                <img src={`${(lightTheme)?"/darkModeIcon.png":"/lightModeIcon.png"}`} className="h-5"/>
                           </li>  
                           <Link  href={"/auth/signin"} className=" transition-colors text-nowrap px-4 py-2 rounded-[4px]  text-white hover:border-green-800 hover:bg-amber-50 hover:text-green-800 border border-[#ffffff00]  bg-green-800  cursor-pointer">Get Started</Link>   
                        </ul>
                    </div>
                </nav>
         </header>


         <motion.section className="h-fit w-full flex flex-col items-center px-1.5 py-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" } }  
 id="home">

                <div className="w-full flex  flex-col justify-center py-10">
                    <h1 className="w-full text-center min-[780px]:text-7xl     min-[500px]:text-5xl text-2xl px-2 py-3">Don’t just write, keep it.</h1>
                    <h6 className="w-full text-center min-[780px]:text-[15px]  min-[500px]:text-[12px] text-[10px] px-2 py-5">Keep Notes helps you capture, organize, and access your ideas anytime, anywhere.</h6>
                </div>

                <div className="flex flex-col items-center justify-center  rounded-t-2xl rounded-b-[10px]  to-[white]  gap-5 ">
                    <img src={(lightTheme)?"/mainBgBlackImage.png":"/mainBgImage.png"} className="min-[780px]:h-90 h-70"/>
                    <div className="w-full flex  justify-center gap-5 items-center">
                          <h1 className="text-center">Start Noting</h1>
                          <button><Link href={`auth/signin`} className=" transition-colors text-nowrap px-4 py-2 rounded-[4px]  text-white hover:border-green-800 hover:bg-amber-50 hover:text-green-800 border border-[#ffffff00]  bg-green-800  cursor-pointer" >Get Started</Link></button>
                    </div> 
                </div>

          </motion.section>

           <motion.section className=" h-fit px-4  py-7 flex flex-col justify-center" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ opacity: 0 }}   id="about">
                <h1 className="w-full box-border py-4 px-2 text-4xl">About</h1>
                
                <p className="px-2 py-2 text-[10px] min-[780px]:text-[15px] ">Keep Notes makes it effortless to organize your thoughts and ideas. Whether it’s a quick note or an important reminder, everything stays just a click away.</p>
            
                <div className="flex py-10">
                    <ul className="min-[780px]:flex grid min-[450px]:grid-cols-2  grid-rows-[auto]  w-full justify-around py-6">
                       <Features featureHeading="Add a new note instantly"  featureImageLink={(lightTheme)?"/addNoteDark.png":"/addNote.png"} />
                       <Features featureHeading="Edit or update notes effortlessly" featureImageLink={(lightTheme)?"/editNoteDark.png":"/editNote.png"} />
                       <Features featureHeading="Delete notes with a single click" featureImageLink={(lightTheme)?"/deleteNoteDark.png":"/deleteNote.png"} />
                       <Features featureHeading="Access your notes anywhere, anytime" featureImageLink={(lightTheme)?"/accessNoteDark.png":"/accessNote.png"} />
                    </ul>
                </div>
                
            </motion.section>

            <div className="w-full px-10">
              <hr className={`w-full h border ${(lightTheme)?"border-[#00000018]":"border-[#ffffff25]"}`}/>
            </div>

             <motion.section className=" h-fit w-full px-4 " initial={{opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }} transition={{ duration: 0.8, ease: "easeOut" }} id="contact">
                   
                   <h1 className="w-full  py-4 px-2 text-center text-4xl">Get In Touch</h1>
                    <div className="w-full flex justify-center">
                         <p className="px-1 py-5 text-[10px] min-[780px]:text-[15px] text-left">Your feedback helps us grow and improve. If you have suggestions, feature requests, or want to collaborate, we’re just a message away.</p>
                    </div>

                   <div className="flex w-full justify-center py-2">
                        <form className="flex flex-col  gap-2 p-4 rounded-2xl ">
                            <input className="rounded-2xl border-green-800 border-2 w-[30vw] min-w-[250px] h-10 text-center placeholder-gray-400 " placeholder="Email"/>
                            <input className="rounded-2xl border-green-800 border-2 w-[30vw] min-w-[250px] h-10 text-center placeholder-gray-400 " placeholder="Subject"/>
                            <textarea className="rounded-2xl border-green-800 border-2  text-center min-h-40">
                                 
                            </textarea>
                            <button type="submit" className="transition-colors text-nowrap px-4 py-2 rounded-2xl  text-white hover:border-green-800 hover:bg-amber-50 hover:text-green-800 border border-[#ffffff00]  bg-green-800  cursor-pointer">Send</button>
                        </form>
                   </div>
                    
                   

                   <footer className=" h-fit flex flex-col py-2 justify-center ">
                       <ul className=" flex w-full justify-center gap-5 py-2">
                          <li className="h-fit"><a className="text-[13px] flex items-center gap-1"  target="_blank" href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSHxjdKGSFjBdMXjKFbqcFvvwmVlJVFZKGtdGBSmmhdpWpmdXpkfkvmzHhWXZSwtTHLckcpq"><img src={(lightTheme)?"/mailBlackIcon.png":"/mailIcon.png"} className="h-5"/>Email</a></li>
                          <li className="h-fit"><a className="text-[13px] flex items-center gap-1"  target="_blank" href="https://www.linkedin.com/in/kartikey-singh-gahlot-58020124b/"><img src={(lightTheme)?"/linkedInBlackIcon.png":"/linkedInIcon.png"} className="h-5"/>LinkedIn</a></li>
                          <li className="h-fit"><a className="text-[13px] flex items-center gap-1"  target="_blank" href="https://github.com/Kartikey-Singh-Gahlot"><img src={(lightTheme)?"/gitHubBlackIcon.png":"/gitHubIcon.png"} className="h-5"/>GitHub</a></li>
                       </ul>
                       <h1 className={`w-full text-center text-[10px] py-2 ${(lightTheme)?"text-gray-400":"text-gray-500"}`}>© 2025 Keep Notes. All rights reserved.</h1>
                   </footer>
            </motion.section>

   </main>
  );
}
