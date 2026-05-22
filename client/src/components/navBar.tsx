"use client";
import React from "react";
import Link from "next/link";
import { HomeNavBarProps } from "../interfaces/HomeNavBarInterfaces";


export function HomeNavBar({ items, itemLinks, subItems }: HomeNavBarProps) {
    let listItems = items.map((i, idx) => {
        return (
            <li className="text-nowrap transition-all px-10 py-2 relative mainItem cursor-pointer hover:bg-green-800 hover:text-white rounded-[4px]" key={idx}>
                <Link href={itemLinks[idx]}>
                    {i}
                </Link>
                <ul className="absolute dropContent">
                    {(subItems && subItems.length > 0) ? subItems[idx]?.map((subI, subIdx) => { return <li key={subIdx}>{subI}</li>; }) : null}
                </ul>
            </li>
        );
    });

    return (
        <ul className="flex min-[780px]:flex-row flex-col font-semibold">
            {listItems}
        </ul>
    );
}
