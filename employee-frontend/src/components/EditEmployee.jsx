import {useForm} from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'

function EditEmployee() {

  const{register,handleSubmit,setValue}=useForm()

  const {state}=useLocation()

  const navigate=useNavigate()

  const [loading,setLoading]=useState(false)

  const [error,setError]=useState("")

  const saveModifiedEmp=async (modifiedEmp)=>{
    try{
      setLoading(true)
      //Make HTTP PUT request
    const res=await axios.put(`/employee-api/employees/${state._id}`,modifiedEmp)
    //console.log(res)
    if(res.status===200){
      navigate("/list")
    }
    else{
      let errorRes=res.data
      console.log(errorRes)
      throw new Error(errorRes.reason)
    }
    }
    catch(err){
      setError(err.message)
    }
    finally{
      setLoading(false)
    } 

  }
  
  useEffect(()=>{
    setValue("name",state.name)
    setValue("email",state.email)
    setValue("mobile",state.mobile)
    setValue("designation",state.designation)
    setValue("companyName",state.companyName)
  },[state,setValue])

  if (loading) {
    return <p className="text-center text-4xl">Loading....</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center text-3xl">{error}</p>;
  }
  
  return (
    <div>
      <div className='text-center'>
      <h1 className='text-2xl mt-5'>Edit Employee</h1>
      <form className="w-full max-w-md mt-7 block mx-auto" onSubmit={handleSubmit(saveModifiedEmp)}>
        <input type="text" placeholder='Enter name of employee' {...register("name")}  className='mb-3 border p-3 w-full rounded-2xl'/>
        <input type="email" placeholder='Enter employee email' {...register("email")}  className='mb-3 border p-3 w-full rounded-2xl'/>
        <input type="number" placeholder='Enter mobile number' {...register("mobile")} className='mb-3 border p-3 w-full rounded-2xl'/>
        <input type="text" placeholder='Enter designation' {...register("designation")} className='mb-3 border p-3 w-full rounded-2xl'/>        
        <input type="text" placeholder='Enter name of the company' {...register("companyName")} className='mb-3 border p-3 w-full rounded-2xl'/>
        <button type="submit" className='block mx-auto mt-5 bg-amber-500 rounded-2xl p-5'>Save</button>
      </form>
    </div>
    </div>
  )
}

export default EditEmployee