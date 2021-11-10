const mongoose = require('mongoose'); 

//Define a schema 
const Schema = mongoose.Schema;

const CvEdu = new Schema({ 

  CVId: {type: mongoose.Schema.Types.ObjectId, ref: 'BLCV'},
  EduStatus:{type:Number,default:1},
  EduTitle:{type:String,required:true},
  EduDesc:{type:String,required:true}, 
  EduFrom:{type:String,required:true},
  EduTo:{type:String,required:true},
  EduSkill:[{type: mongoose.Schema.Types.ObjectId, ref: 'BLCVSkill'}]
});
      
 
      
module.exports = mongoose.model('BLCVEdu', CvEdu);