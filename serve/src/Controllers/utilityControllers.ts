const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel.js');
const roadMapModel = require("../Models/roadmapModel.js");
const { mailerFunction } = require('../Config/nodeMailer.js');
const {contactMailTemplate, contactAcknowledgementMailTemplate} = require("../Utils/emailTemplate.js");
const subjectModel = require('../Models/subjectModel.js');
const roadmapModel = require('../Models/roadmapModel.js');
require('dotenv').config();



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

const createRoadmap = async (req, res)=>{
   try{
     const {authCookie} = req.cookies;
     const {name, description, subjects} = req.body;
     const isValid = jwt.verify(authCookie, process.env.SECRETKEY);
     const verify = await userModel.findOne({email:isValid.email});
     if(isValid && verify.admin){
       const roadmapExists = await roadMapModel.findOne({name});
       if(roadmapExists){
        console.log(roadmapExists);
        return res.status(400).json({
          status:false,
          code:"ROADMAP_ALREADY_EXISTS",
          body:"Roadmap Name Already Exists"
        })
       }
       let subsToCreate = [];
       if(subjects){
         for(const subName of subjects){ 
              const subExists = await subjectModel.findOne({name:subName});
              if(subExists){ 
                subsToCreate.push(subExists._id) 
                continue;
              }
              const newSub = new subjectModel({name:subName});
              const createdSub = await newSub.save();
              subsToCreate.push(createdSub._id);
         }
       }
       const newRoadmap = new roadmapModel({name, description:(description)?description:undefined, subjects:subsToCreate});
       const createdRoadmap = await (await newRoadmap.save()).populate({
        path:"subjects",
        select:"name"
       });
       return res.status(201).json({
         status:true,
         code:"ROADMAP_CREATED_SUCCESSFULLY",
         body:createdRoadmap
       })
     }
     return res.status(401).json({
      status:false,
      code:"UNAUTHORIZED_ACCESS",
      body:"Unauthorized Acess"
     })
   }
   catch(err){
     return res.status(500).json({
       status:false,
       code:"INTERNAL_SERVER_ERROR",
       body:err.message
     })
   }
}

const getAllRoadmaps = async (req, res)=>{
   try{
       const roadmaps = await roadMapModel.find({}).populate({ path:'subjects', select:"name"});
       return res.status(200).json({
         status:true,
         body:roadmaps
       });
    }
    catch(err){
      return res.status(500).json({
        status:false,
        body:`Internal Server Error ${err.message}`
      });
    }
}

const getARoadmap = async (req, res)=>{
}

const createSubject = async (req, res)=>{
   try{
    const {authCookie} = req.cookies;
    const {name, description} = req.body;
    const isValid = jwt.verify(authCookie, process.env.SECRETKEY);
    const verify = await userModel.findOne({email:isValid.email});
    if(isValid.admin  && verify.admin){
      const subExists = await subjectModel.findOne({name});
      if(subExists){
        console.log(subExists);
        return res.status(400).json({
          status:false,
          code:"SUBJECT_ALREADY_EXISTS",
          body:"Subject Name Already Exists"
        })
      }
      const subject = new subjectModel({name, description});
      const newSub = await subject.save();
      return res.status(201).json({
        status:true,
        code:"NEW_SUBJECT_CREATED",
        body : newSub
      });
    }
    return res.status(401).json({
      status:false,
      code:"UNAUTHORIZED_ACCESS",
      body:{one: isValid.admin, two:verify.admin}
    })
   }
   catch(err){
    return res.status(500).json({
      status:false,
      code:"INTERNAL_SERVER_ERROR",
      body:err.message
    })
   }
} 

const getAllSubjects = async (req, res)=>{
    try{
       const subjects = await subjectModel.find();
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

const getASubject = async (req, res)=>{

}

module.exports = {checkGuestTheme, getUserDetails, getAllRoadmaps, setUserTheme, contact , createSubject, createRoadmap}