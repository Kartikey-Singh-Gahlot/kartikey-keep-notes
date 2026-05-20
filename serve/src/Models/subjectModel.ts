import mongoose, {type mongo} from "mongoose"
import type subjectSchemaType from "../Interfaces/SchemaInterfaces/subjectModelInterface.js";

const subjectSchema = new mongoose.Schema<subjectSchemaType>({
  name:{type:String, default:'General', unique:true, required:true},
  description:{type:String, default: function get():string{return `This is basic ${this.name} subject`}},
  chapters:{type:[mongoose.Schema.Types.ObjectId], ref:'chapters', default:[]},
  imageUrl:{type:String, default:"./mainBgBlackImageOne.png"},
  likesCount:{type:Number, default:0},
  createdAt:{type:Date, default:Date.now}
})

export default  mongoose.model('subjects', subjectSchema);