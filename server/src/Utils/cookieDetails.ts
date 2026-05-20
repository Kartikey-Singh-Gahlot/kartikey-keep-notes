import { type CookieOptions } from "express";

const cookieDetails: CookieOptions = {
 httpOnly: true,
 secure: true,      
 sameSite: "none",
 maxAge : 7*24*60*60*1000,
}

export default cookieDetails;
