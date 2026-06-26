"use client";
import { HomeNavBar } from "../components/navBar";
import Link from "next/link";
import Logo from "../components/logo";
import { ExploreSubjectsPresenter } from "../components/sbjectsPresenter";
import "./globals.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HamBurgerMenu } from "../components/hamBurgerMenu";
import ContactForm from "../components/contactForm";

export default function Home() {
    const router = useRouter();

    let [lightTheme, setLightTheme] = useState(true);
    let [mobileNav, setMobileNav] = useState(false);
    let [subjects, setSubjects] = useState([{ name: "", description: "", chapters: [], createdAt: "" }]);

    async function trgrModeChange() {
        const newTheme = !lightTheme;
        setLightTheme(newTheme);
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_AUTH_SERVICE_PORT}/guest`, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lightTheme: newTheme }) });
    }

    async function checkGuest(){
        const unp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_AUTH_SERVICE_PORT}/guest`, { method: "GET", credentials: "include", headers: { "Content-Type": "application/json" }});
        const pr = await unp.json();
        if(pr.status && pr.body.lightTheme!=lightTheme){
            setLightTheme(pr.body.lightTheme);
            return ;
        }
    }


    async function checkAuth() {
        const unp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_AUTH_SERVICE_PORT}/auth/check`, { method: "GET", credentials: "include", headers: { "Content-Type": "application/json" } });
        const pr = await unp.json();
        if(pr.status){
            router.push("/dashboard");
            return ;
        }
    }


    function trgrMobileNav() {
        setMobileNav(!mobileNav);
    }

    function trgrMobileNavOff() {
        if (mobileNav) {
            setMobileNav(false);
        }
    }

    function handleResize() {
        if (window.innerWidth > 780) {
            setMobileNav(false);
        }
    }

    useEffect(() => {
        handleResize();
        checkAuth();
        checkGuest();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
    <main className={`pageWrapper ${(lightTheme) ? "lightTheme" : "darkTheme"}`} onClick={trgrMobileNavOff}>
            
        <header className={`header ${(lightTheme) ? "lightTheme" : "darkTheme"}`}>

            {/* -----------< Logo >-------------------- */}
                <div className="w-full"> 
                    <Logo/> 
                </div>
            {/* -----------< Logo >-------------------- */}


            {/* -----------< Navigation Bar >-------------------- */}
                <nav className="nav" >

                    <div className="menuWrapper">
                        <HamBurgerMenu trgrMobileNav={trgrMobileNav} mobileNav={mobileNav} />
                    </div>

                    <div className={`navBarWrapper ${(mobileNav) ? `${(lightTheme) ? "lightTheme" : "darkTheme"} navBarOn` : "hidden"}`}>
                        <HomeNavBar items={["Home", "About", "Contact"]} itemLinks={["#home", "#about", "#contact"]} />

                        <ul className="navBarDropMenu">
                            <li className="navBarDropMenuItem" onClick={(e) => { e.stopPropagation(); trgrModeChange(); }} >
                                <img src={`${(lightTheme) ? "/darkModeIcon.png" : "/lightModeIcon.png"}`} className="h-5" alt="Theme Toggle"/>
                            </li>
                            <Link href={"/auth/signin"} className="heroButton">Get Started</Link>
                        </ul>
                    </div>
                </nav>
            {/* -----------< Navigation Bar >-------------------- */}

        </header>

        {/* -----------< Hero Section >-------------------- */}
            <section className="sections px-1.5 py-10" id="home">
                    <div className="w-full flex flex-col justify-center py-10">
                        <h1 className="heroTitle">Learn with Kartz. Track Your Growth</h1>
                        <h6 className="sectionContent text-center">Access structured notes, follow along with YouTube lessons, and track your progress — all in one place.</h6>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-t-2xl rounded-b-[10px] to-[white] gap-5 ">
                        <img src="/mainBgBlackImageOne.png" className="min-[780px]:h-90 h-70" alt="Main Hero"/>
                        <div className="w-full flex justify-center gap-5 items-center">
                            <h1 className="text-center">Want to get started?</h1>
                            <button><Link href={`auth/signin`} className="transition-colors text-nowrap px-4 py-2 rounded-[4px] text-white hover:border-green-800 hover:bg-amber-50 hover:text-green-800 border border-[#ffffff00] bg-green-800 cursor-pointer" >Come along</Link></button>
                        </div>
                    </div>
            </section>
        {/* -----------< Hero Section >-------------------- */}

<div className="w-full px-10"><hr className={`w-full h border ${(lightTheme) ? "border-[#00000018]" : "border-[#ffffff25]"}`} /></div>

        {/* -----------< About Section >-------------------- */}
            <section className="sections px-4  py-10 justify-center" id="about">
                <h1 className="w-full text-4xl py-5">Why Choose Us?</h1>
                <p className="sectionContent ">Structured paths. Real lessons. Clear progress. Everything you need to go from curious to confident — without the chaos.</p>
                <ExploreSubjectsPresenter theme={lightTheme} />
            </section>
        {/* -----------< About Section >-------------------- */}

<div className="w-full px-10"><hr className={`w-full h border ${(lightTheme) ? "border-[#00000018]" : "border-[#ffffff25]"}`} /></div>

        {/* -----------< Contact Section >-------------------- */}
            <section className="sections px-4 py-10" id="contact">
                <h1 className="w-full py-4 px-2 text-center text-4xl">Get In Touch</h1>
                <div className="w-full flex justify-center">
                    <p className="sectionContent text-center">Your feedback helps us grow and improve. If you have suggestions, feature requests, or want to collaborate, we’re just a message away.</p>
                </div>

                <div className="flex w-full justify-center py-2">
                    <ContactForm lightTheme={lightTheme} />
                </div>

                <footer className="h-fit flex flex-col py-2 justify-center ">
                    <ul className="flex w-full justify-center gap-5 py-2">
                        <li className="h-fit"><a className="text-[13px] flex items-center gap-1" target="_blank" href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=GTvVlcSHxjdKGSFjBdMXjKFbqcFvvwmVlJVFZKGtdGBSmmhdpWpmdXpkfkvmzHhWXZSwtTHLckcpq" rel="noreferrer"><img src={(lightTheme) ? "/mailBlackIcon.png" : "/mailIcon.png"} className="h-5" alt="Mail"/>Email</a></li>
                        <li className="h-fit"><a className="text-[13px] flex items-center gap-1" target="_blank" href="https://www.linkedin.com/in/kartikey-singh-gahlot-58020124b/" rel="noreferrer"><img src={(lightTheme) ? "/linkedInBlackIcon.png" : "/linkedInIcon.png"} className="h-5" alt="LinkedIn"/>LinkedIn</a></li>
                        <li className="h-fit"><a className="text-[13px] flex items-center gap-1" target="_blank" href="https://github.com/Kartikey-Singh-Gahlot" rel="noreferrer"><img src={(lightTheme) ? "/gitHubBlackIcon.png" : "/gitHubIcon.png"} className="h-5" alt="GitHub"/>GitHub</a></li>
                    </ul>
                    <h1 className={`w-full text-center text-[10px] py-2 ${(lightTheme) ? "text-gray-400" : "text-gray-500"}`}>© 2025 Keep Notes. All rights reserved.</h1>
                </footer>
            </section>
        {/* -----------< Contact Section >-------------------- */}

    </main>
    );
}
