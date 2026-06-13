import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";


export interface userValiditityInterface extends JwtPayload{
  _id:mongoose.Schema.Types.ObjectId,
}

export interface userDetailsInterface{
    name : string,
    isAdmin : true | false,
    imageUrl : string,
    lightTheme: true | false,
    roadmaps:mongoose.Schema.Types.ObjectId[],
    completedSubjects:mongoose.Schema.Types.ObjectId[],
    completedChapters:mongoose.Schema.Types.ObjectId[],
    completedSections:mongoose.Schema.Types.ObjectId[],     
}
