import mongoose, {type mongo} from "mongoose"

interface roadmapInterface{
    name:string
    description:string
    subjects:mongoose.Schema.Types.ObjectId[],
    likesCount:number,
    imageUrl:string,
    createdAt:Date
}

export default roadmapInterface;