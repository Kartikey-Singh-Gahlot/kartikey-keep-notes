const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
    name:{type:String, unique:true},
    subjects:{type:[mongoose.Schema.Types.ObjectId], ref:'subjects', default:[]},
    likesCount:{type:Number, default:0},
    imageUrl:{type:String, default:"./mainBgBlackImageOne.png"},
    createdAt:{type:Date, default:Date.now}
})


module.exports = mongoose.model("roadmaps", roadmapSchema);