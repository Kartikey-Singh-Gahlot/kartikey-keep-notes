import userModel from "../Models/userModel.js";
import mailerFunction from "../Config/nodeMailer.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import express, { type Request, type Response } from "express";
import { signupOtpVerificationMailTemplate, loginOtpVerificationMailTemplate } from "../Utils/emailTemplate.js";
import "dotenv/config";
import cookieDetails from "../Utils/cookieDetails.js";


export const guestCreator = async (req: Request, res: Response) => {
  try {
    const { lightTheme } = req.body;
    const themeToken = jwt.sign({ lightTheme }, process.env.SECRETKEY || ' ', { expiresIn: "7d" });
    res.cookie("themeCookie", themeToken, cookieDetails);
    return res.status(200).json({
      status: true,
      body: "Theme Preference Saved",
      code: "THEME_PREFERENCE_SAVED"
    });
  }
  catch (err) {
    return res.status(500).json({
      status: false,
      body: "Internal Server Error",
      code: "SERVER_SIDE_ERROR"
    });
  }
}

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const exists = await userModel.findOne({ email });
  if (exists) {
    return res.status(409).json({
      status: false,
      body: "User already exists",
      code: "USER_EXISTS"
    })
  }
  try {
    const { themeCookie } = req.cookies;
    let theme = true;
    if (themeCookie) {
      try {
        const validTheme = jwt.verify(themeCookie, process.env.SECRETKEY || '') as JwtPayload;
        if (!validTheme.lightTheme) {
          theme = false;
        }
      }
      catch (err) {
        console.log(err);
      }
    }
    const salt1 = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt1);
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const salt2 = await bcrypt.genSalt();
    const hashedOtp = await bcrypt.hash(otp.toString(), salt2);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    const user = new userModel({ name, email, password: hashedPassword, lightTheme: theme, otp: hashedOtp, otpExpiry });
    await user.save();
    await mailerFunction(email, "Otp Verification", signupOtpVerificationMailTemplate(otp));
    const token = jwt.sign({ email: user.email, admin: user.admin, isVerified: user.isVerified }, process.env.SECRETKEY || '', { expiresIn: "7d" });
    res.clearCookie("themeCookie", cookieDetails);
    res.cookie("authCookie", token, cookieDetails);
    return res.status(200).json({
      status: true,
      body: "Otp Verification Pending",
      code: "OTP_VERIFICATION_REQUIRED"
    })
  }
  catch (err: any) {
    console.log(err);
    return res.status(500).json({
      status: false,
      body: `Internal_Server_Error ${err.message}`,
      code: "SERVER_SIDE_ERROR"
    })
  }
}

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email }).select("+password +otp +otpExpiry +googleId");
    if (!user) {
      return res.status(404).json({
        status: false,
        body: "No_User_Found",
        code: "NO_USER_FOUND"
      })
    }
    if (user.googleId && !user.password) {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const salt = await bcrypt.genSalt();
      user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      user.otp = await bcrypt.hash(otp, salt);
      await user.save();
      await mailerFunction(user.email, "Login Verification", loginOtpVerificationMailTemplate(otp))
      return res.status(200).json({
        status: true,
        body: "Otp Verification Pending",
        code: "OTP_VERIFICATION_REQUIRED"
      })
    }
    if (!password) {
      return res.status(400).json({
        status: false,
        body: "Password Required",
        code: "PASSWORD_REQUIRED"
      });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        status: false,
        body: "Invalid Credentials",
        code: "UNAUTHORIZED_ACCESS"
      });
    }

    if (!user.isVerified) {
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      const salt = await bcrypt.genSalt();
      user.otp = await bcrypt.hash(otp, salt);
      user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();
      await mailerFunction(user.email, "Login Verification", loginOtpVerificationMailTemplate(otp));
      return res.status(200).json({
        status: true,
        body: "Otp Verification Pending",
        code: "OTP_VERIFICATION_REQUIRED"
      })
    }

    const token = jwt.sign({ email: user.email, isVerified: user.isVerified, admin: user.admin }, process.env.SECRETKEY || '', { expiresIn: "7d" });
    res.cookie("authCookie", token, cookieDetails);
    return res.status(200).json({
      status: true,
      body: "Login Successful",
      code: "LOGIN_SUCCESS"
    })
  }
  catch (err) {
    return res.status(500).json({
      status: false,
      body: "Internal Server Error",
      code: "SERVER_SIDE_ERROR"
    });
  }
}

export const signOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie('authCookie', cookieDetails);
    res.status(200).json({
      status: true,
      body: "SignOut Successfull",
      code: "LOGOUT_SUCCESSFULL"
    })
  }
  catch (err) {
    res.status(500).json({
      status: false,
      body: "Internal Server Error",
      code: "SERVER_SIDE_ERROR"
    })
  }
}

export const checkAuth = async (req: Request, res: Response) => {
  const { authCookie } = req.cookies;
  if (!authCookie) {
    return res.status(401).json({
      status: false,
      body: "No Auth Token Found",
      code: "UNAUTHORIZED_ACCESS"
    })
  }
  try {
    const user = jwt.verify(authCookie, process.env.SECRETKEY || '') as JwtPayload;
    return res.status(200).json({
      status: true,
      body: "Valid Auth Token Found",
      code: "VALIDATION_SUCCESSFULL",
      isVerified: user.isVerified
    })
  }
  catch (err) {
    return res.status(500).json({
      status: false,
      body: "Internal Server Error",
      code: "SERVER_SIDE_ERROR"
    })
  }
}

export const signupOtpVerification = async (req: Request, res: Response) => {
  const { otp } = req.body;
  const { authCookie } = req.cookies;
  if (!authCookie) {
    return res.status(409).json({
      status: false,
      body: "No Auth Token Found",
      code: "UNAUTHORIZED_ACCESS"
    })
  }
  try {
    const valid = jwt.verify(authCookie, process.env.SECRETKEY || '') as JwtPayload;
    const user = await userModel.findOne({ email: valid.email }).select("+otp +otpExpiry");
    if (!user) {
      return res.status(404).json({
        status: false,
        body: "No User Found",
        code: "NO_USER_FOUND"
      });
    }
    if (!user.otpExpiry || Date.now() > new Date(user.otpExpiry).getTime()) {
      return res.status(400).json({
        status: false,
        body: "Otp Expired",
        code: "OTP_EXPIRED"
      })
    }

    if (!user.otp) {
      return res.status(400).json({
        status: false,
        body: "No OTP Found",
        code: "OTP_EXPIRED"
      })
    }
    const otpValidity = await bcrypt.compare(otp.toString().trim(), user.otp);
    if (!otpValidity) {
      return res.status(401).json({
        status: false,
        body: "Invalid Otp",
        code: "INVALID_OTP"
      })
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    return res.status(200).json({
      status: true,
      body: "Otp Verified",
      code: "OTP_VERIFIED"
    });
  }
  catch (err: any) {
    return res.status(200).json({
      status: false,
      body: `Internal Server Error ${err.message}`,
      code: "SERVER_SIDE_ERROR"
    })
  }
}

export const signinOtpVerification = async (req: Request, res: Response) => {
  const { otp, password, email } = req.body;
  if (!otp) {
    return res.status(400).json({
      status: false,
      body: "Otp Required",
      code: "OTP_REQUIRED"
    });
  }
  try {
    const user = await userModel.findOne({ email }).select("+otp +otpExpiry +email +isVerified");
    console.log(email);
    if (!user) {
      return res.status(404).json({
        status: false,
        body: "No OTP Session Found",
        code: "OTP_SESSION_NOT_FOUND"
      });
    }
    if (!user.otpExpiry || Date.now() > new Date(user.otpExpiry).getTime()) {
      return res.status(400).json({
        status: false,
        body: "Otp Expired",
        code: "OTP_EXPIRED"
      });
    }
    if (!user.otp) {
      return res.status(400).json({
        status: false,
        body: "No OTP Found",
        code: "OTP_EXPIRED"
      });
    }
    const otpValidity = await bcrypt.compare(otp.toString(), user.otp);
    if (!otpValidity) {
      return res.status(401).json({
        status: false,
        body: "Invalid Otp",
        code: "INVALID_OTP"
      });
    }
    user.otp = "undefined";
    user.otpExpiry = undefined;
    user.isVerified = true;
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const token = jwt.sign({ email: user.email, isVerified: user.isVerified }, process.env.SECRETKEY || '', { expiresIn: "7d" });
    res.cookie("authCookie", token, cookieDetails);
    return res.status(200).json({
      status: true,
      body: "Login Successful",
      code: "LOGIN_SUCCESS"
    });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      status: false,
      body: `Internal Server Error ${err.message}`,
      code: "SERVER_SIDE_ERROR"
    });
  }
};


