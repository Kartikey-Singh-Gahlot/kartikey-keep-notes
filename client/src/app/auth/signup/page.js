"use client";
import Logo from "../../components/logo.js";
import "../credentials.css";
import { useState, useEffect, use } from "react";
import Link from "next/link.js";



export default function SignUp(){

    const [lightTheme, setLightTheme] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({name:"", email:"", password:""});

    function trgrShowPassword(){
        setShowPassword(!showPassword);
    }
   
    async function checkTheme() {
       const unp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/util/theme`, {method:"GET",credentials:"include", headers: { "Content-Type": "application/json"}});
       const pr = await unp.json();
       if(pr.body.lightTheme==false){
         setLightTheme(!lightTheme);
       }
    }

    async function trgrModeChange(){
     const newTheme = !lightTheme;
     setLightTheme(newTheme);
     await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/guest`, {method:"POST",credentials:"include", headers: { "Content-Type": "application/json"}, body: JSON.stringify({lightTheme:newTheme})});
   }

    useEffect(()=>{
        checkTheme();
    },[]);

    return(
        <main className={`${(lightTheme)?"lightTheme":"darkTheme"} transition-colors font-semibold`}>
            <header className="fixed w-full flex justify-between px-4 py-2">
                   <Logo/>
                   <li className="transition-all flex  items-center box-border cursor-pointer border-green-800 border  text-nowrap px-4 py-1 rounded-[4px]"onClick={trgrModeChange} >
                        <img src={`${(lightTheme)?"/darkModeIcon.png":"/lightModeIcon.png"}`} className="h-5"/>
                   </li>  
            </header>
            <section className="formWrapper">
                  <form className="form">
                       <label className="formHeading">Create Your Account</label>
                       <div className="inputWrapper">
                             <label className="inputLabel">Name</label>
                             <input type="text" name="name" className="inputs" placeholder="xyz" value={formData.name}/>
                       </div>
                       <div className="inputWrapper">
                             <label className="inputLabel">Email</label>
                             <input type="email" name="email" className="inputs" placeholder="xyz@gmail.com" value={formData.email}/>
                       </div>
                       <div className="inputWrapper">
                             <label className="inputLabel">password</label>
                             <input type={(showPassword)?"text":"password"} name="password" className="inputs" placeholder="password" value={formData.password}/>
                             <div className="w-full flex justify-between  py-2 px-2">
                                 <h1 className="passwordUtility " onClick={trgrShowPassword}>{(showPassword)?"Hide password?":"Show password?"}</h1>
                                 <h1 className="passwordUtility">Forgot password?</h1>
                             </div>
                       </div>

                        <button className="button">Signup</button>
                        
                        <div className="w-full flex items-center px-4">
                            <hr className="border w-full"/>
                            <h1 className="px-2 py-1 text-center">or</h1>
                            <hr className=" border w-full"/>
                        </div>
                
                        <a className="button" href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}>
                            <button type="button" className="flex justify-center w-full gap-2"><img src="/googleIcon.png" className="h-6"/>Continue With Google</button>
                        </a> 
                        <div className="utilityButton">
                             <h1 className="text-[12px]">Already have an account ?</h1>
                             <Link href={"/auth/signin"} className="text-[12px]">
                                Login
                             </Link>
                        </div>                  
                  </form>
            </section>
        </main>
    )
}