import { guestCreator, checkAuth, signOut, signup, signin, signupOtpVerification, signinOtpVerification } from "../Controllers/authControllers.js";
import { getUserDetails, checkGuestTheme, contact, setUserTheme, getAllRoadmaps, createSubject, createRoadmap, getAllSubjects } from "../Controllers/utilityControllers.js";
import limiter from "../Middlewares/rateLimiter.js";
import { Router } from "express";



const router = Router();

router.post("/auth/guest", guestCreator);
router.get("/guest/theme", checkGuestTheme);


router.get("/auth/user", checkAuth);
router.post("/auth/user/signup", signup);
router.post("/auth/user/signupOtpVerification", signupOtpVerification);

router.post("/auth/user/signout", signOut);
router.post("/auth/user/signin", signin);
router.post("/auth/user/signinOtpVerification", signinOtpVerification);




router.post("/contact", limiter, contact);
router.get("/user", getUserDetails);
router.patch("/user/theme", setUserTheme);



router.get("/roadmap", getAllRoadmaps);
router.post("/roadmap", createRoadmap);
router.post("/subject", createSubject);



export default router;