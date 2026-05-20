import express, { type Request, type Response } from 'express';
import passport from "../Config/passport.js";
import jwt from "jsonwebtoken";
import userModel from '../Models/userModel.js';
import "dotenv/config";
import cookieDetails from '../Utils/cookieDetails.js';

const googleRouter = express.Router();

googleRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
  })
);

googleRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),

  async (req: Request, res: Response): Promise<any> => {
    try {

      const { themeCookie } = req.cookies;

      const { user, newUser } = req.user as {
        user: {
          _id: string;
          email: string;
        };
        newUser: boolean;
      };

      if (newUser && themeCookie) {
        try {

          const themeValid = jwt.verify(
            themeCookie,
            process.env.SECRETKEY || ''
          ) as {
            lightTheme: boolean;
          };

          await userModel.findByIdAndUpdate(user._id, {
            $set: {
              lightTheme: themeValid.lightTheme
            }
          });

        } catch (err) {
          console.log("Invalid Theme Cookie");
        }
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email
        },
        process.env.SECRETKEY || '',
        {
          expiresIn: "7d"
        }
      );

      res.cookie("authCookie", token, cookieDetails);

      return res.redirect(
        `${process.env.FRONTEND_LINK_STRING}/dashboard`
      );

    } catch (err: any) {

      return res.status(500).json({
        status: false,
        body: `Internal Server Error : ${err.message}`
      });

    }
  }
);

export default googleRouter;