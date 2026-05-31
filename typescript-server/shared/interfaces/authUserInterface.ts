
interface authUserInterface{
   email: string,
   password: string | null,
   googleId: string | null ,
   admin: true | false,
   isVerified: true | false ,
   createdAt: Date
}

export default  authUserInterface;