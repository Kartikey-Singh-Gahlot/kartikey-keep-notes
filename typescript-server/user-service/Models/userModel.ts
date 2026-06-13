import mongoose from "mongoose";
import userInterface from "../../shared/interfaces/userInterface";


const userModelSchema = new mongoose.Schema<userInterface>({
   authId: {type:mongoose.Schema.Types.ObjectId, required:true},
   name: {type:String, required:true},
   imageUrl: {type:String, required:true},
   lightTheme: {type:Boolean, default:true},
   roadmaps:{type:[mongoose.Schema.Types.ObjectId], ref:'roadmap', default:[]},
   completedSubjects:{type:[mongoose.Schema.Types.ObjectId], ref:'Subjects', default:[]},
   completedChapters:{type:[mongoose.Schema.Types.ObjectId], ref:'Chapters', default:[]},
   completedSections:{type:[mongoose.Schema.Types.ObjectId], ref:'Sections', default:[]},
   likedSubjects:{type:[mongoose.Schema.Types.ObjectId], ref:'Subjects', default:[]},
   createdAt: {type:Date, default:Date.now}
});

export default mongoose.model("users", userModelSchema);