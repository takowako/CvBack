const { validationResult } = require('express-validator')
var ObjectId = require('mongoose').Types.ObjectId;

const CvModel = require('../../models/CvSchema');
const CvMetaModel = require('../../models/CvMetaSchema')
const UserModel = require('../../models/UserSchema');
const ExpModel = require('../../models/ExperienceSchema');
const EduModel=require('../../models/EducationSchema');
const ContactModel = require('../../models/ContactSchema')
const OrgModel=require('../../models/OrganizationSchema');
const ProjModel=require('../../models/ProjectSchema');
const ReffModel=require('../../models/ReffernceSchema');
const SkillModel = require('../../models/SkillSchema')
const AwModel=require('../../models/AwSchema');



exports.Save =function(req,res,next){

    //validate inputs 
    const errors = validationResult(req);

    if(errors.errors.length > 0 ){
       return res.json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }

    //Create New CV
    var SaveCv=new CvModel();
    SaveCv.CVName=req.body.CvNameI;
    SaveCv.CVUId=req.user._id;
    SaveCv.save(function(err,result){

        if( result && !err){

            //push cv id to user
            UserModel.findOne({_id:req.user._id},function(err2,result2){

                if(result2 && !err2){
                    result2['CVUCvId'].push(result._id)
                    result2.save();
                    
                   res.send('Cv Saved');
                }

            })

            //res.send(result)
        }
    })


}



exports.Update=function(req,res){

    //validate Inputs 
    const errors = validationResult(req);
    if(errors.errors.length > 0 ){
        res.json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }

    var CvId=req.params.cvId;
    if(!ObjectId.isValid(CvId)){
        return res.send('Param Not Valid');
    }

    var Update={
        CVName:req.body.CvNameI
    }

    CvModel.findOneAndUpdate({_id:CvId},Update,function(err,result){

        if(!err && result){
            console.log('updated')
            res.send('CV Updated')
        }
        else{
            res.send('unable to find cv')
        }

    })

    res.send('Update cv')

}

exports.Delete=function(req,res) {
    
    var CvId=new ObjectId(req.params.cvId);
    if(!ObjectId.isValid(req.params.cvId)){
        return res.send('Param Not Valid');
    }

    

    ExpModel.find({CVId:CvId},function(err,resss){
        console.log('resss',resss)
        console.log('its woriking')
    })

    //Delete related Exp
     ExpModel.deleteMany({CVId:CvId},function(err){
         console.log(err)
     })

    // //Delete related edu
     EduModel.deleteMany({CVId:CvId},function(err){
         console.log(err)
     })

    // //Delete related proj
     ProjModel.deleteMany({CVId:CvId},function(err){
         console.log(err)
     })

    // //Delete related contacts
     ContactModel.deleteMany({CVId:CvId},function(err){
        console.log(err)
    })

    // //Delete related skills
     SkillModel.deleteMany({CVId:CvId},function(err){
        console.log(err)
    })

    // //delete related org
     OrgModel.deleteMany({CVId:CvId},function(err){
        console.log(err)
    })

    // //delete related reff
     ReffModel.deleteMany({CVId:CvId},function(err){
        console.log(err)
    })

    // //delete related awards
    AwModel.deleteMany({CVId:CvId},function(err){
        console.log(err)
    })

    // //delete related cv meta
    CvMetaModel.deleteMany({CVId:CvId},function(err){
        console.log(err)
    })

    CvModel.findByIdAndDelete(CvId,function(err,result){
        console.log(result)
        res.send('Cv Deleted ')
    })


    //res.send('cv deleted')



    

}