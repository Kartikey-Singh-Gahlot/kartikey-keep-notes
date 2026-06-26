"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../../components/logo";
import { HamBurgerMenu } from "../../components/hamBurgerMenu";
import { NormalSubjectsPresenter } from "../../components/sbjectsPresenter";
import "./dashboard.css";

import { UserDetails } from "../../interfaces/DashboardInterfaces";

export default function Dashboard() {
    const router = useRouter();

    const [userDetails, setUserDetails] = useState<UserDetails>({ email: "", name: "", lightTheme: true, subjects: [] });
    const [mobileNav, setMobileNav] = useState(false);

    function trgrMobileNav() {
        setMobileNav(!mobileNav);
    }

    function trgrMobileNavOff() {
        // Implementation here if needed
    }

    async function trgrModeChange() {
        setUserDetails((prev) => {
            return { ...prev, lightTheme: !prev.lightTheme };
        });
        const unp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_AUTH_SERVICE_PORT}/${process.env.NEXT_PUBLIC_AUTH_SERVICE_SUFFIX}/theme`, { method: "PATCH", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ theme: !userDetails.lightTheme }) });
        const pr = await unp.json();
    }

    async function getCredentials() {
        const un = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_AUTH_SERVICE_PORT}/${process.env.NEXT_PUBLIC_AUTH_SERVICE_SUFFIX}/user`, { method: "GET", credentials: "include", headers: { "Content-Type": "application/json" } });
        const pr = await un.json();
        console.log(pr);
        if (pr.status && pr.body.isVerified) {
            setUserDetails({
                email: pr.body.email,
                name: pr.body.name,
                lightTheme: pr.body.lightTheme,
                subjects: pr.body.subjects || []
            });
            console.log(pr);
            return;
        }
        router.push("/auth/signin");
    }

    useEffect(() => {
        getCredentials();
    }, []);

    async function trgrSignOut() {
        const un = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_AUTH_SERVICE_PORT}/${process.env.NEXT_PUBLIC_AUTH_SERVICE_SUFFIX}/signout`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" } });
        const pr = await un.json();
        if (pr.status) {
            router.push("/auth/signin");
        }
    }

    return (
        <main className={`pageWrapper ${(userDetails.lightTheme) ? "lightTheme" : "darkTheme"} transition-colors font-semibold `} onClick={trgrMobileNavOff}>
            <header className={`${(userDetails.lightTheme) ? "lightTheme" : "darkTheme"} fixed w-full flex px-5 py-3 items-center box-border transition-colors`}>
                <div className="w-full"><Logo /></div>

                <nav className="pl-2 px-2 flex min-[780px]:flex-row flex-col justify-end items-center box-border w-full " >
                    <div className="min-[780px]:w-fit w-full flex justify-end ">
                        <HamBurgerMenu trgrMobileNav={trgrMobileNav} mobileNav={mobileNav} />
                    </div>

                    <div className={`min-[780px]:flex min-[780px]:relative ${(mobileNav) ? `${(userDetails.lightTheme) ? "lightTheme" : "darkTheme"} flex absolute top-12 py-10 gap-10 left-0 w-full items-start border-b-2 border-b-green-800` : "hidden"} min-[780px]:flex-row flex-col`}>
                        <ul className="flex flex-row w-full box-border gap-2 px-10">
                            <li className="transition-all flex items-center box-border cursor-pointer border-green-800 border border-[#ffffff00] text-nowrap px-4 py-1 rounded-[4px]" onClick={trgrModeChange} >
                                <img src={`${(userDetails.lightTheme) ? "/darkModeIcon.png" : "/lightModeIcon.png"}`} className="h-5" alt="Theme Toggle" />
                            </li>
                            <Link type="button" href={"/auth/signin"} className="transition-colors text-nowrap px-4 py-2 rounded-[4px] text-white hover:border-green-800 hover:bg-amber-50 hover:text-green-800 border border-[#ffffff00] bg-green-800 cursor-pointer" onClick={trgrSignOut}>Sign Out</Link>
                        </ul>
                    </div>
                </nav>
            </header>

            <section className="h-fit w-full flex flex-col items-center justify-center px-1.5 py-20" >
                <h1>Subjects available</h1>
                <NormalSubjectsPresenter />
            </section>

        </main>
    );
}
