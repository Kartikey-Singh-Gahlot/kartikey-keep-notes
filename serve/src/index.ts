import "dotenv/config";
import express, { type Application } from "express";
import setDataBaseConnection from "./Models/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app:Application = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_LINK_STRING,
  credentials: true
}))

// app.use(passport.initialize());



const PORT = process.env.PORT || 8080;


setDataBaseConnection().then(():void=>{
  console.log("Database Connected ")
   app.listen(PORT, () => {
         console.log(`Server running on port ${PORT}`); 
    });
}).catch((err:Error)=>{
   console.log(err.message);
   process.exit(1);
})
