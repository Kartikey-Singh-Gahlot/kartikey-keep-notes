"use client";
import { useState } from "react";
import { toast } from "sonner";
import Loader from "../components/loader.js";



export default function ContactForm({lightTheme}){
 
    let [formData, setFormData] = useState({sender:"", message:""});
    let [loading, setLoading] = useState(false);

    function trgrFormChange(e){
       setFormData((prev)=>{
          return {...prev, [e.target.name]:e.target.value}
       })
    }

    async function trgrFormSubmit(e) {
       e.preventDefault();
       if(loading){return;}
       setLoading(true);
       try{
        const unp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {method:"POST", credentials:"include", headers:{"Content-Type":"application/json"}, body:JSON.stringify(formData)});
        const pr = await unp.json();
        if(pr.status){
          toast.success("Email Sent", {duration:1000});
          return;
        }
        if(!pr.status){
          toast.error(pr.body);
          return;
        }
       }
       catch(err){
         toast.error("Server Error")
         console.log(err);
       }
       finally{
          setLoading(false);
       }
 
    }

   
    return(
       (!loading)?
       (<form  onSubmit={(e)=>{trgrFormSubmit(e)}} className="flex flex-col  gap-2 p-4 rounded-2xl ">
            <input  required  onChange={(e)=>{ trgrFormChange(e)}} value={formData.sender} name="sender" className="rounded-[5px] border-green-800 border-2 w-[30vw] min-w-[250px] h-10 text-center placeholder-gray-400 text-[14px]" placeholder="xyz@gmail.com"/>
            <textarea onChange={(e)=>{ trgrFormChange(e)}} value={formData.message}    name="message"    className="rounded-[5px] border-green-800 border-2  p-1.5 min-h-40  placeholder:text-gray-400 text-[14px]"                    placeholder="Your message for us"/>
            <button type="submit" className="transition-colors text-nowrap px-4 py-2 rounded-2xl  text-white hover:border-green-800 hover:bg-amber-50 hover:text-green-800 border border-[#ffffff00]  bg-green-800  cursor-pointer">Send</button>
      </form>):(<Loader theme={(lightTheme)?"lightTheme":"darkTheme"}/>)
    )  
 }
      
      
         

