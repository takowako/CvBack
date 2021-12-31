const { validationResult } = require('express-validator');
const CvModel=require('../models/CvSchema');
const OrgModel=require('../models/OrganizationSchema');

const facade = require('../others/facades');
var ObjectId = require('mongoose').Types.ObjectId;


exports.Save = function(req,res,next){

    //validate Inputs 
    const errors = validationResult(req);
    if(errors.errors.length > 0 ){
        return res.status(400).json({
            success:false,
            payload:errors.errors,
            msg:'Validation Error' 
        });
    }

    //get Cv id 
    var CvId = req.user.CVUCvId;

    var saveOrg=new OrgModel();
    saveOrg.CVId=CvId;
    saveOrg.OrgTitle=req.body.OrgNameI;
    saveOrg.OrgDesc=req.body.OrgDescI;
    saveOrg.OrgJob=req.body.OrgJobI;
    saveOrg.OrgFrom=req.body.OrgFromI;
    saveOrg.OrgTo=req.body.OrgToI;
    
    saveOrg.save(function(err,result){
        if(!err){
            facade.PushToCvArr(CvId,'CVOrg',saveOrg._id)

            //get list of organization
            OrgModel.find({CVId:CvId}).exec(function(err2,result2){

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