import exp from 'express'
import { employeeModel } from '../models/EmployeeModel.js'

export const employeeApp=exp.Router()

//Creating an employee
employeeApp.post("/employees",async (req,res)=>{

    //Get employee details from client
    const newEmployee=req.body

    //Create new document
    const newEmployeeDocument= new employeeModel(newEmployee)

    //Save
    await newEmployeeDocument.save()

    //Send response
    res.status(201).json({message:"Employee created"})
})

//Read all employees
employeeApp.get("/employees",async(req,res)=>{

    //Read all employees
    let employeesList=await employeeModel.find()

    //Send response
    res.status(200).json({message:"Employees List",payload:employeesList})
})

//Updated an employee
employeeApp.put("/employees/:employeeId",async(req,res)=>{

    //Get employeeId from client
    const modifiedEmployee=req.body
    const empid=req.params.employeeId
    
    //Find product by Id and update
    const updatedEmployee=await employeeModel.findByIdAndUpdate(
        empid,
        {
            $set:{...modifiedEmployee}
        },
        {returnDocument:"after"}
    )

    //Send response
    res.status(200).json({message:"Employee updated",payload:updatedEmployee})
})

//Delete an employee
employeeApp.delete("/employees/:employeeId",async(req,res)=>{
    //Get employee Id from client
    const empid=req.params.employeeId

    let deletedEmployee=await employeeModel.findByIdAndDelete(empid)
    
    //If product is not found
    if(!deletedEmployee){
        return res.status(404).json({message:"Employee not found"})
    }
    //Send response
    res.status(200).json({message:"Employee removed",payload:deletedEmployee})
})