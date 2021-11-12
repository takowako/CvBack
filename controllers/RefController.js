const { validationResult } = require('express-validator');

const RefModel=require('../models/ReffernceSchema');
const CvModel=require('../models/CvSchema');

const facade = require('../others/facades');



exports.Save= function(req,res,next){


    //validate Inputs 
    const errors = validationResult(req);
    if(errors.errors.length > 0 ){
        res.json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }

    var CvId = req.user.CVUCvId;
    //console.log(req.user)

    var SaveRef = new RefModel();
    SaveRef.CVId=CvId;
    SaveRef.RefName=req.body.RefNameI;
    SaveRef.RefJob=req.body.RefJobI;
    SaveRef.RefMail=req.body.RefMailI;
    SaveRef.RefPhone=req.body.RefPhoneI;
    SaveRef.save(function(err,result){

        if(!err){
            //push ref to Cv Exp Arr
            facade.PushToCvArr(CvId,'CVReff',SaveRef._id)
            return res.send('Reff Saved');
        }

    })
}















exports.Delete=function(req,res,next){

    var RefId=req.params.refId;
    
    //Check Education & Delete  
    RefModel.findOneAndDelete({_id:RefId},function(err,result){

        if(!err && result){
            //Get CV & Remove Edu Id From CVEdu
            facade.PullCvArr(result.CVId,'CVReff',RefId)
            res.send('Reffrence Deleted');
        }
        else{
            return res.send('Unable To Delete Reffrence');
        }
    })

}