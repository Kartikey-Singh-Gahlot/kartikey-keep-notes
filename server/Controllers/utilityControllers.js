const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel.js');
const { mailerFunction } = require('../Config/nodeMailer.js');
const {contactMailTemplate, contactAcknowledgementMailTemplate} = require("../Utils/emailTemplate.js");
const SubjectModel = require('../Models/subjectModel.js');
const subjectModel = require('../Models/subjectModel.js');
require('dotenv').config();


const addNewSubject = async (req, res)=>{
  const {authCookie} = req.cookies;
  if(!authCookie){
    console.log(authCookie+":auth ")
    return res.status(401).json({
      status:false,
      code :"UNAUTHORIZED_ACCESS",
      body:"No Auth Token Found"
    })
  }
  try{
     const valid = jwt.verify(authCookie,process.env.SECRETKEY);
     const user = await userModel.findOne({email:valid.email});
     if(!user || !user.admin){
      return res.status(401).json({
        status:false,
        code :"UNAUTHORIZED_ACCESS",
        body:"Restricted"
      });
     }
     const {name, description} = req.body;
     const newSubject = new SubjectModel({name, description});  
     await newSubject.save();
     return res.status(200).json({
      status:true,  
      code :"SUBJECT_CREATION_SUCCESSFULL",
      body:"New Subject Added"
     });
  }
  catch(err){
    return res.status(500).json({
      status:false,
      code :"SERVER_SIDE_ERROR",
      body:`Internal Server Error ${err.message}`
    });
  }
}

const checkGuestTheme = async (req, res)=>{
  const {themeCookie} = req.cookies;
  if(!themeCookie){
    const themeDetails = jwt.sign({lightTheme:true}, process.env.SECRETKEY);
    const cookieDetails = {
      httpOnly: true,
      secure: true,      
      sameSite: "None",
      maxAge : 7*24*60*60*1000,
    }
    res.cookie("themeCookie", themeDetails, cookieDetails);
    return res.status(400).json({
        status:false,
        body :"New User"
    })
  }
  else{
    try{
      const guest = jwt.verify(themeCookie, process.env.SECRETKEY);
      res.status(200).json({
         status : true,
         body : guest
      })
    }
    catch(err){
       res.status(500).json({
        status:false,
        body : `Internal Server Error ${err.message}`
       })
    }
    
  }
}

const getUserDetails = async (req,res)=>{
    const {authCookie} = req.cookies;
    try{
      if(authCookie){
        const valid = jwt.verify(authCookie, process.env.SECRETKEY);
        const email = valid.email;
        const user = await userModel.findOne({email});
        if(!user){
          return res.status(404).json({
            status:false,
            body:"User Not Found"
          });
        }
        return res.status(200).json({
          status : true,
          body : {email:user.email, name:user.name, lightTheme:user.lightTheme, subjects:user.subjects, isVerified:user.isVerified, completedSubjects:user.completedSubjects, completedChapters:user.completedChapters, completedSections:user.completedSections}
        })
      }
      return res.status(401).json({
        status:false,
        body:"Authentication Required"
      })  
    }
    catch(err){
      console.log(err);
      res.status(500).json({
        status : false,
        body : `Internal Server Error ${err.message}` 
      })
    }
}

const getAllSubjects = async (req, res)=>{
    try{
       const subjects = await SubjectModel.find();
       return res.status(200).json({
         status:true,
         body:subjects
       });
    }
    catch(err){
      return res.status(500).json({
        status:false,
        body:`Internal Server Error ${err.message}`
      });
    }
}

const setUserTheme = async (req, res)=>{
   const {authCookie} = req.cookies;
   const {theme} = req.body;
   if(!authCookie){
     return res.status(401).json({
       status : false,
       body : "Authentication Required"
     });
   }
   try{
      const valid = jwt.verify(authCookie, process.env.SECRETKEY);
      const user = await userModel.findOneAndUpdate({email:valid.email},{lightTheme: theme},{new:true});
      if(!user){
        return res.status(404).json({
          status:false,
          body : "User Not Found"
        })
      }
      return res.status(200).json({
        status:true,
        body : "Theme Changed"
      })
   }
   catch(err){
     return res.status(500).json({
      status : false,
      body: "Internal Server Error"
     })
   }

}

const contact = async (req, res)=>{
  try{
    const {sender, message} = req.body;
    if(!sender || !message){
      return res.status(400).json({
        status:false,
        body:"Sender email and message are required"
      });
    }
    await mailerFunction(process.env.ADMIN_USERID, "User contact from contact form", contactMailTemplate(sender, message));
    await mailerFunction(sender, "Acknowledgement", contactAcknowledgementMailTemplate(sender));

    return res.status(200).json({
      status:true,
      body:"Email has been sent"
    })
  }
  catch(err){
   console.log(err);
   return res.status(500).json({
    status:false,
    body:`Internal Server Error : ${err.message}`
   })
  }
}



module.exports = {checkGuestTheme, getUserDetails, getAllSubjects, setUserTheme, contact ,addNewSubject}