import exp from 'express'
import {connect} from 'mongoose'
import {config} from 'dotenv'
import { employeeApp } from './APIs/EmployeeAPI.js'
import cors from 'cors'

config()

const app=exp()

// Logging middleware to debug requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

//Middlewares
app.use(cors()) 
app.use(exp.json())

//Forward requests to employeeAPI
app.use("/employee-api", employeeApp)

import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine the dist folder location
const possibleDistPaths = [
  path.join(__dirname, "../employee-frontend/dist"),
  path.join(__dirname, "dist"),
  path.join(__dirname, "../dist")
];

let distPath = possibleDistPaths.find(p => fs.existsSync(p));

if (distPath) {
  console.log("Serving static files from:", distPath);
  app.use(exp.static(distPath));
  
  // Handle React routes (catch-all for SPA)
  app.get(/(.*)/, (req, res, next) => {
    // If it starts with /employee-api but got here, it means the API route didn't match
    if (req.url.startsWith('/employee-api')) {
      return res.status(404).json({ message: "API route not found" });
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  console.warn("WARNING: No dist folder found.");
}

const port=process.env.PORT||5000

async function connectDB(){
    try{
        if (!process.env.MONGODB_URL) {
            console.error("FATAL: MONGODB_URL environment variable is missing!");
            process.exit(1);
        }
        await connect(process.env.MONGODB_URL);
        console.log("DB Connection success")
    }catch(err){
        console.error("Error in DB connection: ", err)
        process.exit(1);
    }
}
connectDB();

// Build the server regardless so Render does not think we exited early
app.listen(port,()=>console.log(`Server listening on port ${port}`))

app.use((err,req,res,next)=>{
    console.log(err.name)
    //console.log(err.code)

    //Validation Error
    if(err.name==='ValidationError'){
        return res.status(400).json({message:"Error occurred", error:err.message})
    }

    //Cast Error
    if(err.name==='CastError'){
        return res.status(400).json({message:"Error occurred", error:err.message})
    }

    //Mongoose Error
    
    //Send Server Side Error
    res.status(500).json({message:"Error occurred", error:err.message})
})

//Error handling middleware
app.use((err, req, res, next) => {
  console.log("Error message: ",err.message)
  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Error cause:", err.cause);
  console.log("Full error:", JSON.stringify(err, null, 2));
  //ValidationError
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  //CastError
  if (err.name === "CastError") {
    return res.status(400).json({ message: "error occurred", error: err.message });
  }
  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];
    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`,
    });
  }

  //send server side error
  res.status(500).json({ message: "error occurred", error: "Server side error" });
});