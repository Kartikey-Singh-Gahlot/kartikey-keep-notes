const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const setDataBaseConnection = require('./Models/database.js');
const googleRouter = require('./Routes/googleAuthRoutes.js');
const Router = require('./Routes/routes.js');
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
  origin: process.env.FRONTEND_LINK_STRING,
  credentials: true
}));

app.use(passport.initialize());


app.use("/", Router);
app.use("/", googleRouter);


app.listen(8080, ()=>{
    console.log("listening..")
});


module.exports = app;