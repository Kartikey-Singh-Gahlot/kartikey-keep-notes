import ResponseEntity from "../../shared/interfaces/responseEntityInterface";
import { Request, Response } from "express";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"
import cookieDetails from "../../shared/templates/cookieDetails"


export async function authService(request:Request, response:Response):Promise<Response>{
  const responsePayLoad:ResponseEntity<string>={
    status:true,
    code:"",
    body:"",
  }
   try{
       responsePayLoad.code="SERVICE_REACHABLE";
       responsePayLoad.body="Auth Service Reachable :)";
       return response.status(200).json(responsePayLoad);

   }
   catch(err){
      responsePayLoad.code="INTERNAL_SERVER_ERROR",
      responsePayLoad.body="Auth Service Not Reachable !"
      return response.status(500).json()
   }
   
}

export async function guestCreator(request:Request, response:Response):Promise<Response>{
   const responsePayLoad:ResponseEntity<string>={
    status:true,
    code:"",
    body:"",
  }
  try{
    const { lightTheme } = request.body;
    const themeToken = jwt.sign({lightTheme}, process.env.SECRETKEY || '', {expiresIn:"7d"});
    response.cookie("themeCookie", themeToken, cookieDetails);
    responsePayLoad.code="THEME_PREFERENCE_SAVED"
    responsePayLoad.body="Theme Preference Saved"
    return response.status(201).json(responsePayLoad);
  }
  catch(err){
    responsePayLoad.code="SERVER_SIDE_ERROR";
    responsePayLoad.body="Internal Server Error";
    return response.status(500).json(responsePayLoad);
  }

}


// export function signup(request: Request, response: Response){
//   const responsePayLoad:ResponseEntity<string>={
//     status:true,
//     code:"",
//     body:"",
//   }
//   const { name, email, password } = request.body;
//   const exists = await userModel.findOne({ email });
//   if (exists) {
//     return res.status(409).json({
//       status: false,
//       body: "User already exists",
//       code: "USER_EXISTS"
//     })
//   }
//   try {
//     const { themeCookie } = req.cookies;
//     let theme = true;
//     if (themeCookie) {
//       try {
//         const validTheme = jwt.verify(themeCookie, process.env.SECRETKEY || '') as JwtPayload;
//         if (!validTheme.lightTheme) {
//           theme = false;
//         }
//       }
//       catch (err) {
//         console.log(err);
//       }
//     }
//     const salt1 = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(password, salt1);
//     const otp = Math.floor(1000 + Math.random() * 9000).toString();
//     const salt2 = await bcrypt.genSalt();
//     const hashedOtp = await bcrypt.hash(otp.toString(), salt2);
//     const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
//     const user = new userModel({ name, email, password: hashedPassword, lightTheme: theme, otp: hashedOtp, otpExpiry });
//     await user.save();
//     await mailerFunction(email, "Otp Verification", signupOtpVerificationMailTemplate(otp));
//     const token = jwt.sign({ email: user.email, admin: user.admin, isVerified: user.isVerified }, process.env.SECRETKEY || '', { expiresIn: "7d" });
//     res.clearCookie("themeCookie", cookieDetails);
//     res.cookie("authCookie", token, cookieDetails);
//     return res.status(200).json({
//       status: true,
//       body: "Otp Verification Pending",
//       code: "OTP_VERIFICATION_REQUIRED"
//     })
//   }
//   catch (err: any) {
//     console.log(err);
//     return res.status(500).json({
//       status: false,
//       body: `Internal_Server_Error ${err.message}`,
//       code: "SERVER_SIDE_ERROR"
//     })
//   }
// }
