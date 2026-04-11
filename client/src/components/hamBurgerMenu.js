export function HamBurgerMenu({mobileNav, trgrMobileNav}){
    return(
        <div className="min-[780px]:hidden flex flex-col justify-center h-fit  gap-1 cursor-pointer" onClick={trgrMobileNav}>
             <hr className={`transition-all h-0.5 w-6 ${(mobileNav)?"rotate-45  translate-y-1.5 ":"rotate-0"}  bg-green-800`}/>
             <hr className={`transition-all h-0.5 w-6 ${(mobileNav)?"bg-[#ffffff00] border-none":" bg-green-800"}`}/>
             <hr className={`transition-all h-0.5 w-6 ${(mobileNav)?"-rotate-45 -translate-y-1.5":"rotate-0"}  bg-green-800`}/>
        </div>
    )
}