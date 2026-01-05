"use client"
import { useRouter } from "next/navigation.js";
import {useState} from "react";
import { toast } from "sonner";

export function SigninOtpVerificationBox(){
    const [formData, setFormData] = useState({one:"", two:"", three:"", four:""});
    const router = useRouter();

    async function trgrFormSubmit(e){
      e.preventDefault();
      try{
        const unp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/signinOtpVerification`, {method:"POST", credentials:"include", headers:{"Content-Type": "application/json"}, body:JSON.stringify({otp:formData.one+formData.two+formData.three+formData.four})});
        const pr = await unp.json();
        if(pr.status){
          router.push("/dashboard");
        }
      }
      catch(err){
        toast.error("Server Side Error");
      }
    
    }

    function trgrChange(e){
      if (!/^\d?$/.test(e.target.value)) return;
      setFormData((prev)=>{
         return {...prev, [e.target.name]:e.target.value};
      });
      if(e.target.value && e.target.nextSibling){
         e.target.nextSibling.focus();
      }

    }
    return(
        <form className="flex flex-col items-center p-3 rounded-2xl gap-5" onSubmit={(e)=>{trgrFormSubmit(e)}}>
             <h1 className="text-3xl py-2">Otp Verification</h1>
             <p className="w-full text-[10px] text-justify">An email has been sent to the registered email id, enter here for verification</p>
             <div className="flex justify-center gap-2 ">
                  <input onChange={(e)=>{trgrChange(e)}} type="text" name="one" inputMode="numeric" maxLength={1}   className="border-2 text-center border-green-900 rounded w-15 h-15" value={formData.one}/>
                  <input onChange={(e)=>{trgrChange(e)}} type="text" name="two" inputMode="numeric" maxLength={1}   className="border-2 text-center border-green-900 rounded w-15 h-15" value={formData.two}/>
                  <input onChange={(e)=>{trgrChange(e)}} type="text" name="three" inputMode="numeric" maxLength={1} className="border-2 text-center border-green-900 rounded w-15 h-15" value={formData.three}/>
                  <input onChange={(e)=>{trgrChange(e)}} type="text" name="four" inputMode="numeric" maxLength={1}  className="border-2 text-center border-green-900 rounded w-15 h-15" value={formData.four}/>
             </div>
             <button type="submit" className="bg-green-900 text-white rounded-2xl px-20 py-2">Submit</button>
             <div className="flex"><h1 className="px-1">didn't received mail ?</h1><button>resend</button></div>
        </form>
    )
}


export  function SignupOtpVerificationBox(){
    const [formData, setFormData] = useState({one:"", two:"", three:"", four:""});
    const router = useRouter();

    async function trgrFormSubmit(e){
      e.preventDefault();
      try{
        const unp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/signinOtpVerification`, {method:"POST", credentials:"include", headers:{"Content-Type": "application/json"}, body:JSON.stringify({otp:formData.one+formData.two+formData.three+formData.four})});
        const pr = await unp.json();
        if(pr.status){
          router.push("/dashboard");
          return;
         }
      }
      catch(err){
        toast.error("Server Side Error");
      }
    }

    function trgrChange(e){
      if (!/^\d?$/.test(e.target.value)) return;
      setFormData((prev)=>{
         return {...prev, [e.target.name]:e.target.value};
      });
      if(e.target.value && e.target.nextSibling){
         e.target.nextSibling.focus();
      }

    }
    return(
        <form className="flex flex-col items-center p-3 rounded-2xl gap-5" onSubmit={(e)=>{trgrFormSubmit(e)}}>
             <h1 className="text-3xl py-2">Otp Verification</h1>
             <p className="w-full text-[10px] text-justify">An email has been sent to the registered email id, enter here for verification</p>
             <div className="flex justify-center gap-2 ">
                  <input onChange={(e)=>{trgrChange(e)}} type="text" name="one" inputMode="numeric" maxLength={1}   className="border-2 text-center border-green-900 rounded w-15 h-15" value={formData.one}/>
                  <input onChange={(e)=>{trgrChange(e)}} type="text" name="two" inputMode="numeric" maxLength={1}   className="border-2 text-center border-green-900 rounded w-15 h-15" value={formData.two}/>
                  <input onChange={(e)=>{trgrChange(e)}} type="text" name="three" inputMode="numeric" maxLength={1} className="border-2 text-center border-green-900 rounded w-15 h-15" value={formData.three}/>
                  <input onChange={(e)=>{trgrChange(e)}} type="text" name="four" inputMode="numeric" maxLength={1}  className="border-2 text-center border-green-900 rounded w-15 h-15" value={formData.four}/>
             </div>
             <button type="submit" className="bg-green-900 text-white rounded-2xl px-20 py-2">Submit</button>
             <div className="flex"><h1 className="px-1">didn't received mail ?</h1><button>resend</button></div>
        </form>
    )
}