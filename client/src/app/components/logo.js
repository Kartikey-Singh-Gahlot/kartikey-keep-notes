"use client";
import Link from "next/link";
import "./components.css";

export default function Logo(){
    return(
        <Link href={"/"} className="flex items-center gap font-semibold">
            <div className="text-4xl">K</div>
            <div className="flex flex-col items-center px-0.5 pt-1">
                <h1 className="text-[7px] w-full ">EEP</h1>
                <h1 className="text-[7px] w-full ">NOTES</h1>
            </div>
        </Link>
    )
}