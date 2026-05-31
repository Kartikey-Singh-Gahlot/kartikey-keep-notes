import mongoose from "mongoose";

interface subjectInterface{
    name:String,
    description:String,
    chapters:mongoose.Schema.Types.ObjectId[],
    imageUrl:String,
    likesCount:Number,
    createdAt:Date
}

export default subjectInterface;