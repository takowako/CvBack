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


//Save Experiance Validation
exports.ExpValidate=[
        //Exp Title validate
        check('ExpTitleI').notEmpty()
        .withMessage('Expreiance Title is required'),

        //Exp Description validation
        check('ExpDescI').notEmpty()
        .withMessage('Expreince Description Is Required'),

        //Exp Job Validation
        check('ExpJobI').notEmpty()
        .withMessage('Experiance Job Is Required'),

        //Exp from Validation
        check('ExpFromI').notEmpty()
        .withMessage('Expreiance From Date Is Required'),

        //Exp To Validation
        check('ExpToI').notEmpty()
        .withMessage('Experiance To Date Is Required '),

        //Exp Skill Validation
        check('ExpSkillI').notEmpty()
        .withMessage('Experiance Skill Is Required'),
]
//End Save Experiance Validation


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

]
//End Save Skill Validation


//Save Edu validation
exports.EduValidate=[
        //Edu Title validate
        check('EduTitleI').notEmpty()
        .withMessage('Education Title is required'),

        //Exp Description validation
        check('EduDescI').notEmpty()
        .withMessage('Education Description Is Required'),

        //Exp from Validation
        check('EduFromI').notEmpty()
        .withMessage('Education From Date Is Required'),

        //Exp To Validation
        check('EduToI').notEmpty()
        .withMessage('Education To Date Is Required '),

        //Exp Skill Validation
        check('EduSkillI').notEmpty()
        .withMessage('Education Skill Is Required'),

]
//End Save Edu validatiom



//Save Reff validation start

exports.SaveRefvalidate=[

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