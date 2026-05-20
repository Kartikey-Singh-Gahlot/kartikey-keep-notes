import jwt, { type JwtPayload } from "jsonwebtoken";
import userModel from "../Models/userModel.js";
import roadmapModel from "../Models/roadmapModel.js";
import mailerFunction from "../Config/nodeMailer.js";
import { contactMailTemplate, contactAcknowledgementMailTemplate } from "../Utils/emailTemplate.js";
import subjectModel from "../Models/subjectModel.js";
import cookieDetails from "../Utils/cookieDetails.js";
import type { Request, Response } from "express";
import "dotenv/config";



export const checkGuestTheme = async (req: Request, res: Response) => {
  const { themeCookie } = req.cookies;
  if (!themeCookie) {
    const themeDetails = jwt.sign({ lightTheme: true }, process.env.SECRETKEY || '');
    res.cookie("themeCookie", themeDetails, cookieDetails);
    return res.status(400).json({
      status: false,
      body: "New User"
    })
  }
  else {
    try {
      const guest = jwt.verify(themeCookie, process.env.SECRETKEY || '') as JwtPayload;
      res.status(200).json({
        status: true,
        body: guest
      })
    }
    catch (err: any) {
      res.status(500).json({
        status: false,
        body: `Internal Server Error ${err.message}`
      })
    }

  }
}

export const getUserDetails = async (req: Request, res: Response) => {
  const { authCookie } = req.cookies;
  try {
    if (authCookie) {
      const valid = jwt.verify(authCookie, process.env.SECRETKEY || '') as JwtPayload;
      const email = valid.email;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({
          status: false,
          body: "User Not Found"
        });
      }
      return res.status(200).json({
        status: true,
        body: { email: user.email, name: user.name, lightTheme: user.lightTheme, isVerified: user.isVerified, completedSubjects: user.completedSubjects, completedChapters: user.completedChapters, completedSections: user.completedSections }
      })
    }
    return res.status(401).json({
      status: false,
      body: "Authentication Required"
    })
  }
  catch (err: any) {
    console.log(err);
    res.status(500).json({
      status: false,
      body: `Internal Server Error ${err.message}`
    })
  }
}

export const setUserTheme = async (req: Request, res: Response) => {
  const { authCookie } = req.cookies;
  const { theme } = req.body;
  if (!authCookie) {
    return res.status(401).json({
      status: false,
      body: "Authentication Required"
    });
  }
  try {
    const valid = jwt.verify(authCookie, process.env.SECRETKEY || '') as JwtPayload;
    const user = await userModel.findOneAndUpdate({ email: valid.email }, { lightTheme: theme }, { new: true });
    if (!user) {
      return res.status(404).json({
        status: false,
        body: "User Not Found"
      })
    }
    return res.status(200).json({
      status: true,
      body: "Theme Changed"
    })
  }
  catch (err: any) {
    return res.status(500).json({
      status: false,
      body: "Internal Server Error"
    })
  }

}

export const contact = async (req: Request, res: Response) => {
  try {
    const { sender, message } = req.body;
    if (!sender || !message) {
      return res.status(400).json({
        status: false,
        body: "Sender email and message are required"
      });
    }
    await mailerFunction(process.env.ADMIN_USERID || '', "User contact from contact form", contactMailTemplate(sender, message));
    await mailerFunction(sender, "Acknowledgement", contactAcknowledgementMailTemplate(sender));

    return res.status(200).json({
      status: true,
      body: "Email has been sent"
    })
  }
  catch (err: any) {
    console.log(err);
    return res.status(500).json({
      status: false,
      body: `Internal Server Error : ${err.message}`
    })
  }
}

export const createRoadmap = async (req: Request, res: Response) => {
  try {
    const { authCookie } = req.cookies;
    const { name, description, subjects } = req.body;
    const isValid = jwt.verify(authCookie, process.env.SECRETKEY || '') as JwtPayload;
    const verify = await userModel.findOne({ email: isValid.email });
    if (!verify) {
      return res.status(404).json({
        status: false,
        code: "USER_NOT_FOUND",
        body: "User Not Found"
      })
    }
    if (isValid && verify.admin) {
      const roadmapExists = await roadmapModel.findOne({ name });
      if (roadmapExists) {
        console.log(roadmapExists);
        return res.status(400).json({
          status: false,
          code: "ROADMAP_ALREADY_EXISTS",
          body: "Roadmap Name Already Exists"
        })
      }
      let subsToCreate = [];
      if (subjects) {
        for (const subName of subjects) {
          const subExists = await subjectModel.findOne({ name: subName });
          if (subExists) {
            subsToCreate.push(subExists._id)
            continue;
          }
          const newSub = new subjectModel({ name: subName });
          const createdSub = await newSub.save();
          subsToCreate.push(createdSub._id);
        }
      }
      const newRoadmap = new roadmapModel({ name, description: (description) ? description : undefined, subjects: subsToCreate });
      const createdRoadmap = await (await newRoadmap.save()).populate({
        path: "subjects",
        select: "name"
      });
      return res.status(201).json({
        status: true,
        code: "ROADMAP_CREATED_SUCCESSFULLY",
        body: createdRoadmap
      })
    }
    return res.status(401).json({
      status: false,
      code: "UNAUTHORIZED_ACCESS",
      body: "Unauthorized Acess"
    })
  }
  catch (err: any) {
    return res.status(500).json({
      status: false,
      code: "INTERNAL_SERVER_ERROR",
      body: err.message
    })
  }
}

export const getAllRoadmaps = async (req: Request, res: Response) => {
  try {
    const roadmaps = await roadmapModel.find({}).populate({ path: 'subjects', select: "name" });
    return res.status(200).json({
      status: true,
      body: roadmaps
    });
  }
  catch (err: any) {
    return res.status(500).json({
      status: false,
      body: `Internal Server Error ${err.message}`
    });
  }
}

export const getARoadmap = async (req: Request, res: Response) => {
}

export const createSubject = async (req: Request, res: Response) => {
  try {
    const { authCookie } = req.cookies;
    const { name, description } = req.body;
    const isValid = jwt.verify(authCookie, process.env.SECRETKEY || '') as JwtPayload;
    const verify = await userModel.findOne({ email: isValid.email });
    if (!verify) {
      return res.status(404).json({
        status: false,
        code: "USER_NOT_FOUND",
        body: "User Not Found"
      })
    }
    if (isValid.admin && verify.admin) {
      const subExists = await subjectModel.findOne({ name });
      if (subExists) {
        console.log(subExists);
        return res.status(400).json({
          status: false,
          code: "SUBJECT_ALREADY_EXISTS",
          body: "Subject Name Already Exists"
        })
      }
      const subject = new subjectModel({ name, description });
      const newSub = await subject.save();
      return res.status(201).json({
        status: true,
        code: "NEW_SUBJECT_CREATED",
        body: newSub
      });
    }
    return res.status(401).json({
      status: false,
      code: "UNAUTHORIZED_ACCESS",
      body: { one: isValid.admin, two: verify?.admin }
    })
  }
  catch (err: any) {
    return res.status(500).json({
      status: false,
      code: "INTERNAL_SERVER_ERROR",
      body: err.message
    })
  }
}

export const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await subjectModel.find();
    return res.status(200).json({
      status: true,
      body: subjects
    });
  }
  catch (err: any) {
    return res.status(500).json({
      status: false,
      body: `Internal Server Error ${err.message}`
    });
  }
}

export const getASubject = async (req: Request, res: Response) => {

}