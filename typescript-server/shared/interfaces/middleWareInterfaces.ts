import { Request } from "express";


interface themeData{
    lightTheme:true|false;
}

interface authData{
    authId?:String;
    email?:String;
    isAdmin?:true|false;
    isVerified?:true|false;
    password?:String|null;
    otp?:String|null;
    otpExpiry?:Date|null;   
    firstName?:String;
    middleName?:String;
    lastName?:String;
    lightTheme?:true|false;
}

interface mailData{
    to:String;
    sub:String;
    msg?:String;
}

interface otpAuthData{
    otp:String;
}

export interface  extendedRequest extends Request{
    themeData? : themeData;
    authData?: authData;
    otpAuthData?: otpAuthData;
    mailData?: mailData;

}