import { Request } from "express";


interface themeData{
    lightTheme:true|false;
}

interface authData{
    authId:string;
    isAdmin:true|false;
    isVerified:true|false;
}

export interface  extendedRequest extends Request{
    themeData? : themeData;
    authData? : authData;
}