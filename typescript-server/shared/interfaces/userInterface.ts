import mongoose from "mongoose";

interface userInterface{
   authId:String,
   firstName:String,
   middleName:String,
   lastName:String,
   imageUrl:String,
   lightTheme: true | false,
   roadmaps:mongoose.Schema.Types.ObjectId[],
   completedSubjects:mongoose.Schema.Types.ObjectId[]
   completedChapters:mongoose.Schema.Types.ObjectId[],
   completedSections:mongoose.Schema.Types.ObjectId[],
   likedSubjects:mongoose.Schema.Types.ObjectId[],
   createdAt:Date
}

export default userInterface;