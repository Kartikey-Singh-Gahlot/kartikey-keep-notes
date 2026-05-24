import "./styles/hamBurgerMenu.css";
import { HamBurgerMenuProps } from '../interfaces/HamburgerMenuInterfaces';


export function HamBurgerMenu({ mobileNav, trgrMobileNav }: HamBurgerMenuProps) {
    return (
        <div className="menu-wrapper" onClick={trgrMobileNav}>
            <hr className={`bars ${mobileNav ? "rotate-45 translate-y-1.5" : "rotate-0"}`} />
            <hr className={`bars ${mobileNav ? "opacity-0" : "opacity-100"}`} />
            <hr className={`bars ${mobileNav ? "-rotate-45 -translate-y-1.5" : "rotate-0"}`} />
        </div>
    );
}
