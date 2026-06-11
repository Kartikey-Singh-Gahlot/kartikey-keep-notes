import mongoose from "mongoose";
import roadmapInterface from "../../shared/interfaces/roadmapInterface";


const roadmapModelSchema = new mongoose.Schema<roadmapInterface>({
  name:{type:String, default:'General', unique:true, required:true},
  description:{type:String, default: function get():string{return `This is basic ${this.name} roadmap`}},
  subjects:{type:[mongoose.Schema.Types.ObjectId], ref:'subjects', default:[]},
  likesCount:{type:Number, default:0},
  imageUrl:{type:String, default:"./mainBgBlackImageOne.png"},
  createdAt:{type:Date, default:Date.now}
});

export default mongoose.model("sections", roadmapModelSchema);