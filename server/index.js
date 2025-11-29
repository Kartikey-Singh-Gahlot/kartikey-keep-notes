const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const setDataBaseConnection = require('./Models/database.js');
const googleRouter = require('./Routes/googleAuthRoutes.js');
const authRouter = require('./Routes/authRoutes.js');
const utilityRouter = require('./Routes/utitlityRoutes.js');
const passport = require("./Config/passport.js");


setDataBaseConnection().then(()=>{
    console.log("working");
}).catch((err)=>{
   process.exit(1);
})


app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
  origin: [process.env.FRONTEND_LINK_STRING, "http://localhost:3000"],
  credentials: true
}));

app.use(passport.initialize());


app.use("/", authRouter);
app.use("/", googleRouter);
app.use("/", utilityRouter);

app.listen(8080, ()=>{
    console.log("listening..")
});


module.exports = app;