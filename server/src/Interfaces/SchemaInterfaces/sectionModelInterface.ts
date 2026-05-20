import mongoose, {type mongo} from "mongoose"


export default interface sectionSchemaType{
    chapterId:mongoose.Schema.Types.ObjectId,
    title:string
    content:string,
    blocks:object,
    images:string[],
    subProjects:mongoose.Schema.Types.ObjectId[],
    isSubSection:boolean,
    order:number,
    createdAt:Date
}