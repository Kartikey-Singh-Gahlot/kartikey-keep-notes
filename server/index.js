const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const setDataBaseConnection = require('./Models/database.js');
const googleRouter = require('./Routes/googleAuthRoutes.js');
const Router = require('./Routes/routes.js');
const passport = require("./Config/passport.js");


const port = process.env.EXPRESS_BACKEND_PORT || 8080;

setDataBaseConnection().then(()=>{
    console.log("working");
    app.listen(port, ()=>{
         console.log(`listening on ${port}`);
    });
}).catch((err)=>{
   process.exit(1);
})


app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_LINK_STRING,
  credentials: true
}));

app.use(passport.initialize());
app.use("/", Router);
app.use("/", googleRouter);
