"use client";
import { useState } from "react";


export default function ContactForm(){
 
    let [formData, setFormData] = useState({to:"", subject:"", message:""});

    function trgrFormChange(e){
       setFormData((prev)=>{
          return {...prev, [e.target.name]:e.target.value}
       })
    }

    async function trgrFormSubmit(e) {
       e.preventDefault(); 
    }



    return(
         <form onSubmit={(e)=>{trgrFormSubmit(e)}} className="flex flex-col  gap-2 p-4 rounded-2xl ">
              <input  required  onChange={(e)=>{ trgrFormChange(e)}} value={formData.to} name="to"      className="rounded-[5px] border-green-800 border-2 w-[30vw] min-w-[250px] h-10 text-center placeholder-gray-400 " placeholder="xyz@gmail.com"/>
              <input  onChange={(e)=>{ trgrFormChange(e)}} value={formData.subject}      name="subject" className="rounded-[5px] border-green-800 border-2 w-[30vw] min-w-[250px] h-10 text-center placeholder-gray-400 " placeholder="Subject"/>
              <textarea onChange={(e)=>{ trgrFormChange(e)}} value={formData.message}    name="message" className="rounded-[5px] border-green-800 border-2  p-1.5 min-h-40  placeholder:text-gray-400"                    placeholder="Your message for us"/>
              <button type="submit" className="transition-colors text-nowrap px-4 py-2 rounded-2xl  text-white hover:border-green-800 hover:bg-amber-50 hover:text-green-800 border border-[#ffffff00]  bg-green-800  cursor-pointer">Send</button>
        </form>
    )
}