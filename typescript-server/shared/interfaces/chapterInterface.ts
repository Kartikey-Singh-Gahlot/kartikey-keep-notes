import mongoose, {type mongo} from "mongoose"


interface chapterInterface{
  subjectId : mongoose.Schema.Types.ObjectId,
  number: number,
  title: string,
  sections: mongoose.Schema.Types.ObjectId[],
  order:number,
  createdAt:Date
}

export default chapterInterface;