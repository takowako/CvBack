const { validationResult, check , body } = require('express-validator')
const UserModel = require('../models/UserSchema');




//Save User Validation 
exports.SaveUserValidate=[

        check('FullNameI').notEmpty()
        .withMessage('User Full name  is required'),

        check('MailI').notEmpty()
        .withMessage('User Mail   is required'),

        check('MailI').isEmail()
        .withMessage('Mail Is Wrong'),

        body('MailI').custom(value=>{
           
          return UserModel.findOne({CVUserMail:value}).then(user =>{
             if(user){
                return Promise.reject('E-mail already in use');
             }
          })
 
        }),

        check('PassI').notEmpty()
        .withMessage('Password Is Required'),

        check('PassI').isLength({min:6})
        .withMessage('Pass Minimum length is 6'),

        check('PhoneI').isMobilePhone()
        .withMessage('Wrong Mobile Phone'),
]
//End Save User Validation


//Save Cv Validation
exports.CvValidate=[
        //Cv Name validate
        check('CvNameI').notEmpty()
        .withMessage('Cv Name is required'),
        
]
//End Save Cv Validation


//Save Experience Validation
exports.ExpValidate=[
        //Exp Title validate
        check('ExpTitleI').notEmpty()
        .withMessage('Expreiance Title is required'),

        //Exp Description validation
        check('ExpDescI').notEmpty()
        .withMessage('Expreince Description Is Required'),

        //Exp Job Validation
        check('ExpJobI').notEmpty()
        .withMessage('Experience Job Is Required'),

        //Exp from Validation
        check('ExpFromI').notEmpty()
        .withMessage('Expreiance From Date Is Required'),

        // check('ExpFromI').isISO8601().toDate()
        // .withMessage('Invalid Experience From Date'),

        //Exp To Validation
        check('ExpToI').notEmpty()
        .withMessage('Experience To Date Is Required '),

        // check('ExpToI').isISO8601().toDate()
        // .withMessage('Invalid Experience to Date '),

        //Exp Skill Validation

        //Exp Cv validation
        check('ExpCvI').notEmpty()
        .withMessage('Experience Cv Required'),

]
//End Save Experience Validation


//Save Skill Validation
exports.SkillValidate=[

        //Skill Title Validation
        check('SkillTitleI').notEmpty()
        .withMessage('Skill Title is required'),

        //Skill Descreption Validation
        check('SkillDescI').notEmpty()
        .withMessage('Skill Descreption is required'),

        //Skill Value Validation 
        check('SkillValI').notEmpty()
        .withMessage('Skill Value is required'),

        check('SkillCvI').notEmpty()
        .withMessage('Skill Cv is required'),

]
//End Save Skill Validation


//Save Edu validation
exports.EduValidate=[
        //Edu Title validate
        check('EduTitleI').notEmpty()
        .withMessage('Education Title is required'),

        //Edu Descreption validation
        check('EduDescI').notEmpty()
        .withMessage('Education Description Is Required'),

        //Edu Type validatione
        check('EduTypeI').notEmpty()
        .withMessage('Education Type Is required'),

        //Edu from Validation
        check('EduFromI').notEmpty()
        .withMessage('Education From Date Is Required'),

        //Edu To Validation
        check('EduToI').notEmpty()
        .withMessage('Education To Date Is Required '),

        //Edu Cv validation
        check('EduCvI').notEmpty()
        .withMessage('Education Cv Required'),

        //Edu Skill Validation
        // check('EduSkillI').notEmpty()
        // .withMessage('Education Skill Is Required'),

]
//End Save Edu validatiom



//Save Reff validation start

exports.Refvalidate=[

        //Reff Name validate
        check('RefNameI').notEmpty()
        .withMessage('Reff Name is required'),

        //Reff job validation
        check('RefJobI').notEmpty()
        .withMessage('Reff Job Is Required'),

        //Reff mail Validation
        check('RefMailI').notEmpty()
        .withMessage('Reff Mail Is Required'),

        check('RefMailI').isEmail()
        .withMessage('Reff Mail Is Wrong'),

        //Reff Phone To Validation
        check('RefPhoneI').notEmpty()
        .withMessage('Reff Phone Is Required '),

        check('RefPhoneI').isMobilePhone()
        .withMessage('Reff Mobile Number Is Wrong'),
        
        check('RefCvI').notEmpty()
        .withMessage('Reff Cv is required'),

];
//Save Reff Validation End


//User Login Validate 
exports.LoginUserValidate = [

        //User mail
        check('MailI').notEmpty()
        .withMessage('User Mail   is required'),

        check('MailI').isEmail()
        .withMessage('Mail Is Wrong'),

        //Password
        check('PassI').notEmpty()
        .withMessage('Password Is Required'),
];

//End User login Validate 



//Projecct Validate

exports.ProjValidate=[

        check('ProjNameI').notEmpty()
        .withMessage('Project Name Is required'),

        check('ProjDescI').notEmpty()
        .withMessage('Project Descreption Is Required'),

        check('ProjDateI').notEmpty()
        .withMessage('Project Date is required'),

        check('ProjCvI').notEmpty()
        .withMessage('Project Cv is required'),

]
//End Project validate



//Organization validate

exports.OrgValidate=[
        check('OrgTitleI').notEmpty()
        .withMessage('Organization Title Is required'),

        check('OrgDescI').notEmpty()
        .withMessage('Organization Descreption Is Required'),

        check('OrgJobI').notEmpty()
        .withMessage('Organization Job Is Required'),

        check('OrgFromI').notEmpty()
        .withMessage('Organization From Date Is Required'),

        check('OrgToI').notEmpty()
        .withMessage('Organization To Date Is Required '),
]
//end organization validate


//Award validate
exports.AwValidate=[
        check('AwTitleI').notEmpty()
        .withMessage('Award Title Is required'),

        check('AwDescI').notEmpty()
        .withMessage('Award Descreption Is Required'),

        check('AwJobI').notEmpty()
        .withMessage('Award Job Is Required'),

        check('AwDateI').notEmpty()
        .withMessage('Award From Date Is Required'),
]
//end Award validate