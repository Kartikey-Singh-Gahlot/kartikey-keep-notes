import mongoose, {type mongo} from "mongoose"


export default interface roadmapSchemaType{
    name:string
    description:string
    subjects:mongoose.Schema.Types.ObjectId,
    likesCount:number,
    imageUrl:string,
    createdAt:Date
}