import mongoose, {type mongo} from "mongoose"
import "dotenv/config" 

export default interface userSchemaType {
 name: string,
 email: string,
 password: string
 googleId: string,
 admin:boolean,
 lightTheme: boolean,
 otp?: string | undefined,
 otpExpiry?: Date | undefined,
 isVerified: boolean,
 roadmaps: mongoose.Types.ObjectId[];
 completedSubjects: mongoose.Types.ObjectId[]
 completedChapters: mongoose.Types.ObjectId[]
 completedSections: mongoose.Types.ObjectId[]
 likedSubjects: mongoose.Types.ObjectId[]
 createdAt:Date
}
