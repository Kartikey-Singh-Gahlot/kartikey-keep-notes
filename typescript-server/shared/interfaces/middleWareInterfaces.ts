import { Request } from "express";


interface themeData{
    lightTheme:true|false;
}

interface authData{
    authId:string;
    isAdmin:true|false;
    isVerified:true|false;
    otp:string | null;
    otpExpiry:Date | null;
    password:string | null;
}

export interface  extendedRequest extends Request{
    themeData? : themeData;
    authData? : authData;
}