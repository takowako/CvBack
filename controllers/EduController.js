const { validationResult } = require('express-validator');

const CvModel=require('../models/CvSchema');
const EduModel=require('../models/EducationSchema');

const facade = require('../others/facades')

var ObjectId = require('mongoose').Types.ObjectId;

exports.Save = function(req,res,next){

    //validate Inputs 
    const errors = validationResult(req);
    if(errors.errors.length > 0 ){
        return res.json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }


    //get & Check Cv id
    var CvId = req.body.EduCvI;
    facade.CheckCv(CvId,req.user._id,function(x){

        if(!x){
            return res.json({
                success:false,
                payload:null,
                msg:'Invalid cv' 
            });

        }
    })

    var SaveEdu=new EduModel();
    SaveEdu.CVId =CvId;
    SaveEdu.EduTitle=req.body.EduTitleI;
    SaveEdu.EduDesc=req.body.EduDescI;
    SaveEdu.EduType=req.body.EduTypeI;
    SaveEdu.EduFrom=req.body.EduFromI;
    SaveEdu.EduTo=req.body.EduToI;
    SaveEdu.EduSkill=req.body.EduSkillI;
    SaveEdu.save(function(err,result){

        if(!err){

            //push edu to Cv Exp Arr
            facade.PushToCvArr(CvId,'CVEdu',SaveEdu._id)

            //get list of educations
            EduModel.find({CVId:CvId}).populate({path:'EduSkill'}).exec(function(err2,result2){

                if(!err2){

                    return res.status(201).json({
                        status:true,
                        items:{
                            item:result,
                            list:result2
                        }
                    });
                }
            })
        }
    })

}





exports.Update = function(req,res,next){


    //validate Inputs 
    const errors = validationResult(req);
    if(errors.errors.length > 0 ){
        res.json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }

    //validate param
    var EduId=req.params.eduId;
    if(!ObjectId.isValid(EduId)){
        return res.send('Param Not Valid');
    }

    //find Edu & Update 
    var Update={
        EduTitle:req.body.EduTitleI,
        EduDesc:req.body.EduDescI, 
        EduFrom:req.body.EduFromI,
        EduTo:req.body.EduToI,
    }


    EduModel.findOneAndUpdate({_id:EduId},Update,function(err,result){

        //update Skill Array
        if(!err && result){
            console.log(result.EduSkill)
            result.EduSkill.forEach(item => {
                result.EduSkill.pull(item);
            });
            var newSkillArr= req.body.EduSkillI;
            newSkillArr.forEach(item=>{
                result.EduSkill.push(item);
            })
            result.save();
            res.send('Edu Updated');

        }
        else{
            res.send('Unable To Find Education');
        }

    })




}



exports.Delete=function(req,res,next){

    var EduId=req.params.eduId;
    if(!ObjectId.isValid(EduId)){
        return res.send('Param Not Valid');
    }
    
    //Check Education & Delete  
    EduModel.findOneAndDelete({_id:EduId},function(err,result){

        if(!err && result){
            //Get CV & Remove Edu Id From CVEdu
            facade.PullCvArr(result.CVId,'CVEdu',EduId)
            res.send('Education Deleted')
        }
        else{
            return res.send('Unable To Delete Education');
        }
    })
}