import mongoose, {type mongo} from "mongoose";

interface sectionInterface{
    chapterId:mongoose.Schema.Types.ObjectId,
    title:string
    content:string,
    blocks:object,
    images:string[],
    isSubSection:boolean,
    subSections:mongoose.Schema.Types.ObjectId[],
    order:number,
    createdAt:Date
}

export default sectionInterface;