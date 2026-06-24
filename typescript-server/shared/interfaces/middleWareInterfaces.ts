import { Request } from "express";


interface themeData{
    lightTheme:true|false;
}

interface signupAuthData{    
    password:string | null;
    firstName:string;
    middleName?:string;
    lastName:string;
    email:string;
}

interface loginAuthData{
   authId:string;
   email?:string;
   password:string;   
}

interface hybridAuthData{
    authId:string;
    isAdmin?:true|false;
    isVerified?:true|false;
    password?:string|null;
    otp?:string|null;
    otpExpiry?:Date|null;   
    firstName?:string;
    middleName?:string;
    lastName?:string;
    lightTheme?:true|false;
}

interface otpAuthData{
    otp:string;
}



export interface  extendedRequest extends Request{
    themeData? : themeData;
    signupAuthData? : signupAuthData;
    loginAuthData? : loginAuthData;
    hybridAuthData? : hybridAuthData;
    otpAuthData?: otpAuthData;
}