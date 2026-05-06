import exp from 'express'
import {connect} from 'mongoose'
import {config} from 'dotenv'
import { employeeApp } from './APIs/EmployeeAPI.js'
import cors from 'cors'
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

config()

const app=exp()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors()) 
app.use(exp.json())

// API Routes
app.use("/employee-api", employeeApp)

// Static File Serving (Frontend)
const distPath = path.join(__dirname, "../employee-frontend/dist");

if (fs.existsSync(distPath)) {
  app.use(exp.static(distPath));
  
  // Catch-all for Single Page Application (SPA)
  app.get(/(.*)/, (req, res, next) => {
    // If it starts with /employee-api but reaches here, it's a 404 for the API
    if (req.url.startsWith('/employee-api')) {
      return res.status(404).json({ message: "API Route Not Found" });
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Database Connection
async function connectDB(){
    try{
        if (!process.env.MONGODB_URL) {
            console.error("FATAL: MONGODB_URL is missing!");
            process.exit(1);
        }
        await connect(process.env.MONGODB_URL);
        console.log("DB Connection success")
    }catch(err){
        console.error("DB Connection error: ", err)
        process.exit(1);
    }
}
connectDB();

// Error Handling
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));