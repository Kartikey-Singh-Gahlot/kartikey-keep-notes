import mongoose, {type mongo} from "mongoose"
import type roadmapSchemaType from "../Interfaces/SchemaInterfaces/roadmapModelInterface.js";

const roadmapSchema = new mongoose.Schema<roadmapSchemaType>({
    name:{type:String, unique:true},
    description:{type:String, default: function get():string{return `This is basic ${this.name} roadmap`}},
    subjects:{type:[mongoose.Schema.Types.ObjectId], ref:'subjects', default:[]},
    likesCount:{type:Number, default:0},
    imageUrl:{type:String, default:"./mainBgBlackImageOne.png"},
    createdAt:{type:Date, default:Date.now}
})


export default  mongoose.model("roadmaps", roadmapSchema);