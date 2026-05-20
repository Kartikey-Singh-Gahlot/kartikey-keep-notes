import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 5,                 
  message: {
    status: false,
    body: "Too many requests. Please try again after 10 mins."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;