"use client";
import Link from "next/link";


export function HomeNavBar({items ,itemLinks ,subItems}){

   

    let listItems = items.map((i, idx)=>{
       return(
         <li className="transition-all px-10 py-2 relative mainItem cursor-pointer hover:bg-green-800 hover:text-white rounded-[4px]" key={idx}>
            <a href={itemLinks[idx]}>
                {i}
            </a>
            <ul className="absolute dropContent">
                {(subItems && subItems.length>0)?subItems[idx]?.map((subI, subIdx)=>{ return <li key={subIdx}>{subI }</li> }):""}
            </ul>
        </li>
       )
    })

    return(
        <ul className="flex min-[780px]:flex-row flex-col ">
            {listItems}
        </ul>
    )
}