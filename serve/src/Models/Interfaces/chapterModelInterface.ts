import mongoose, {type mongo} from "mongoose"
import "dotenv/config" 

export default interface chapterSchemaType {
  subjectId : mongoose.Schema.Types.ObjectId,
  number: number,
  title: string,
  sections: mongoose.Schema.Types.ObjectId[],
  order:number,
  createdAt:Date
}
