import mongoose, {type mongo} from "mongoose"


export default interface subjectSchemaType{
    name:string
    description:string
    chapters:mongoose.Schema.Types.ObjectId,
    imageUrl:string,
    likesCount:number,
    createdAt:Date
}