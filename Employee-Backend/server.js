import exp from 'express'
import {connect} from 'mongoose'
import {config} from 'dotenv'
import { employeeApp } from './APIs/EmployeeAPI.js'
import cors from 'cors'

config()

const app=exp()

//Middlewares
app.use(cors({
  origin:["http://localhost:5173"]
}),
)
app.use(exp.json())

//Forward requests to employeeAPI
app.use("/employee-api",employeeApp)

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(exp.static(path.join(__dirname, "../employee-frontend/dist")));

// Handle React routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../employee-frontend/dist", "index.html"));
});

const port=process.env.PORT||5000

async function connectDB(){
    try{
        await connect(process.env.MONGODB_URL);
        console.log("DB Connection success")
        //Start server
        app.listen(port,()=>console.log("Server listening on port 5000"))
    }catch(err){
        console.log("Error in DB connection: ",err)
    }
}
connectDB();

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