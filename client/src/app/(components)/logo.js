"use client";
import Link from "next/link";
import "./components.css";

export default function Logo(){
    return(
        <Link href={"/"} className="flex items-center gap font-semibold">
            <div className="text-4xl">K</div>
            <div className="flex flex-col items-center px-0.5 pt-1">
                <h1 className="text-[8px] w-full font-bold">ARTZ</h1>
                <h1 className="text-[8px] w-full font-bold">STORIES </h1>
            </div>
        </Link>
    )
}