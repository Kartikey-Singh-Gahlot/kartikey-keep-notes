"use client";
import Logo from "../../../components/logo";
import "../credentials.css";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FullScreenLoader } from "../../../components/loader";
import { SignupOtpVerificationBox } from "../../../components/otpVerification";
import { toast } from "sonner";

export default function SignUp() {
    const router = useRouter();
    const [lightTheme, setLightTheme] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [hiddenOtpBox, setHiddenOtpBox] = useState(false);
    const [formData, setFormData] = useState({ firstName:"", middleName:"", lastName:"" ,email: "", password: "" });

    function trgrShowPassword() {
        setShowPassword(!showPassword);
    }

    async function checkGuest(){
        const unp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_AUTH_SERVICE_PORT}/guest`, { method: "GET", credentials: "include", headers: { "Content-Type": "application/json", "internal_service_secret":process.env.NEXT_INTERNAL_SERVICE_SECRET || ""  }});
        const pr = await unp.json();
        if(pr.status && pr.body.lightTheme!=lightTheme){
            setLightTheme(pr.body.lightTheme);
            return ;
        }
    }

     async function checkAuth() {
        const unp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_AUTH_SERVICE_PORT}/auth/check`, { method: "GET", credentials: "include", headers: { "Content-Type": "application/json", "internal_service_secret":process.env.NEXT_INTERNAL_SERVICE_SECRET || "" } });
        const pr = await unp.json();
        if(pr.status){
            router.push("/dashboard");
            return ;
        }
    }

    async function trgrModeChange() {
        const newTheme = !lightTheme;
        setLightTheme(newTheme);
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_AUTH_SERVICE_PORT}/guest`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json", "internal_service_secret":process.env.NEXT_INTERNAL_SERVICE_SECRET || "" }, body: JSON.stringify({ lightTheme: newTheme }) });
    }

    function trgrFormChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }

    async function trgrFormSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (loading) { return; }
        setLoading(true);
        try {
            const unp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_AUTH_SERVICE_PORT}/auth/signup`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json", "internal_service_secret":process.env.NEXT_INTERNAL_SERVICE_SECRET || "" }, body: JSON.stringify(formData) });
            const pr = await unp.json();
            console.log(pr);
            if (pr.status && pr.code == "OTP_VERIFICATION_REQUIRED") {
                toast.success("Otp Sent", { duration: 2000 });
                setHiddenOtpBox(true);
            }
            if (!pr.status && pr.code == "USER_EXISTS") {
                toast.error("User already exists. Redirecting to login...", { duration: 2000 });
                setTimeout(() => {
                    router.push("/auth/signin");
                }, 1000);
                return;
            }
            if (!pr.status) {
                toast.error("Invalid Credentials", { duration: 2000 });
                setFormData((prev) => {
                    return { ...prev, password: "" };
                });
            }
        }
        catch (err:any) {
            toast.error("Server Error: "+ String(err.message));
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        checkGuest();
        checkAuth();
    }, []);

    return (
        <main className={`${(lightTheme) ? "lightTheme" : "darkTheme"} transition-colors font-semibold overflow-hidden`}>
            {(!loading) ?
                (<>
                    <header className="fixed w-full flex justify-between px-4 py-2">
                        <Logo />
                        <li className="transition-all flex items-center box-border cursor-pointer border-green-800 border text-nowrap px-4 py-1 rounded-[4px]" onClick={trgrModeChange} >
                            <img src={`${(lightTheme) ? "/darkModeIcon.png" : "/lightModeIcon.png"}`} className="h-5" alt="Theme Toggle" />
                        </li>
                    </header>
                    <section className="formWrapper" >
                        {(hiddenOtpBox) ? (<SignupOtpVerificationBox />) :
                            (<form className="form" onSubmit={trgrFormSubmit} autoComplete="new-password">
                                <label className="formHeading">Create Your Account</label>
                                <div className="inputWrapper">
                                    <label className="inputLabel">First Name</label>
                                    <input autoComplete="new-password" autoFocus required type="text" name="firstName" className="inputs" placeholder="xyz" value={formData.firstName} onChange={trgrFormChange} />
                                </div>
                                <div className="inputWrapper">
                                    <label className="inputLabel">Middle Name</label>
                                    <input autoComplete="new-password" autoFocus  type="text" name="middleName" className="inputs" placeholder="xyz" value={formData.middleName} onChange={trgrFormChange} />
                                </div>
                                <div className="inputWrapper">
                                    <label className="inputLabel">Last Name</label>
                                    <input autoComplete="new-password" autoFocus required type="text" name="lastName" className="inputs" placeholder="xyz" value={formData.lastName} onChange={trgrFormChange} />
                                </div>
                                <div className="inputWrapper">
                                    <label className="inputLabel">Email</label>
                                    <input autoComplete="new-password" required type="email" name="email" className="inputs" placeholder="xyz@gmail.com" value={formData.email} onChange={trgrFormChange} />
                                </div>
                                <div className="inputWrapper">
                                    <label className="inputLabel">password</label>
                                    <input autoComplete="new-password" required type={(showPassword) ? "text" : "password"} name="password" className="inputs" placeholder="password" value={formData.password} onChange={trgrFormChange} />
                                    <div className="w-full flex justify-between py-2 px-2">
                                        <h1 className="passwordUtility cursor-pointer" onClick={trgrShowPassword}>{(showPassword) ? "✖ Hide password?" : "✔ Show password?"}</h1>
                                        <h1 className="passwordUtility cursor-pointer">Forgot password?</h1>
                                    </div>
                                </div>
                                <button className="button" type="submit">Signup</button>
                                <div className="w-full flex items-center px-4">
                                    <hr className="border w-full" />
                                    <h1 className="px-2 py-1 text-center">or</h1>
                                    <hr className="border w-full" />
                                </div>
                                <a className="button" href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}>
                                    <button type="button" className="flex justify-center w-full gap-2"><img src="/googleIcon.png" className="h-6" alt="Google" />Continue With Google</button>
                                </a>
                                <div className="utilityButton">
                                    <h1 className="text-[12px]">Already have an account ?</h1>
                                    <Link href={"/auth/signin"} className="text-[12px]">
                                        Login
                                    </Link>
                                </div>
                            </form>)
                        }
                    </section>
                </>) : (<FullScreenLoader theme={(lightTheme) ? "lightTheme" : "darkTheme"} />)
            }
        </main>
    );
}
