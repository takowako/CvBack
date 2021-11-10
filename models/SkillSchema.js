const mongoose = require('mongoose'); 

//Define a schema 
const Schema = mongoose.Schema;

const CvSkill = new Schema({ 

  CVId: {type: mongoose.Schema.Types.ObjectId, ref: 'BLCV'},
  SkillTitle:{type:String,required:true},
  SkillDesc:{type:String,required:true}, 
  SkillVal:{type:String,required:true},
  SkillColor:{type:String,required:true}
});
      
 
      
module.exports = mongoose.model('BLCVSkill', CvSkill);