const mongoose = require('mongoose'); 
//Define a schema 
const Schema = mongoose.Schema;


const CvModel= new Schema({
    CVUserId:{type:mongoose.Schema.Types.ObjectId, ref: 'BLCVUser'},
    CVExp:[{type:mongoose.Schema.Types.ObjectId,ref:'BLCVExp'}],
    CVEdu:[{type:mongoose.Schema.Types.ObjectId,ref:'BLCVEdu'}],
    CVSkill:[{type:mongoose.Schema.Types.ObjectId,ref:'BLCVSkill'}],
    CVReff:[{type:mongoose.Schema.Types.ObjectId,ref:'BLCVRef'}],
    CVContact:[{type:mongoose.Schema.Types.ObjectId,ref:'BLCVContact'}]
})

module.exports = mongoose.model('BLCV', CvModel);