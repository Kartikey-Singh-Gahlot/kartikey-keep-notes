
interface authUserInterface{
   email: string,
   password: string | null,
   salt: string | null,
   otp: string | null,
   otpExpiry: Date | null,
   googleId: string | null ,
   admin: true | false,
   isVerified: true | false ,
   createdAt: Date
}

export default  authUserInterface;