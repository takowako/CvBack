const ConatctModel = require('../models/ContactSchema');
const CVMetaModel = require('../models/CvMetaSchema');
const CvModel = require('../models/CvSchema');
const SkillModel = require('../models/SkillSchema');
var mongoose = require('mongoose');


exports.saveCvMeta = function(arr,CvId){

    arr.forEach(item=>{
        var SaveCvMeta = new CVMetaModel();
        SaveCvMeta.CVId=CvId;
        SaveCvMeta.MetaKey=item.key;
        SaveCvMeta.MetaValue=item.value;
        SaveCvMeta.save();
    })
}

exports.saveContact=function(arr,CvId){
    arr.forEach(item => {
        //Save Contact
        var SaveContact = new ConatctModel();
        SaveContact.CVId=CvId;
        SaveContact.CKey=item.key;
        SaveContact.CValue=item.value;
        SaveContact.save(function(err){
            if(!err){
                //Push Contact To Contacts Arr
                CvModel.findOne({_id:CvId},function(err2,result){
                    if(!err2){
                        result.CVContact.push(SaveContact._id);
                        result.save();
                    }
                })
            }
        });
    });
}

exports.SaveSkill=function(arr,CvId){



    arr.forEach(item=>{

        var SaveSkill=new SkillModel();
        SaveSkill.CVId=CvId,
        SaveSkill.SkillTitle=item
        SaveSkill.SkillDesc='   ';
        SaveSkill.SkillVal=100;
        SaveSkill.SkillColor='red';
        SaveSkill.save(function(err,result){
            if(!err){
                //Push Skills To Skills Arr
                CvModel.findOne({_id:CvId},function(err2,result){
                    if(!err2){
                        result.CVSkill.push(SaveSkill._id);
                        result.save();
                    }
                })

            }

        })
    

    })


}
