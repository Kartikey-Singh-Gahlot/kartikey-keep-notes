import mongoose, {type mongo} from "mongoose"


export default interface sectionSchemaType{
    chapterId:mongoose.Schema.Types.ObjectId,
    title:string
    content:string,
    blocks:object,
    images:string[],
    isSubSection:boolean,
    order:number,
    createdAt:Date
}