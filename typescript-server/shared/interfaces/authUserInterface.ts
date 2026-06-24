
interface authUserInterface{
   email: String,
   password: String | null,
   salt: String | null,
   otp: String | null,
   otpExpiry: Date | null,
   googleId: String | null ,
   isAdmin: true | false,
   isVerified: true | false ,
   createdAt: Date
}

export default  authUserInterface;