import {useForm} from 'react-hook-form'
import {useState} from 'react'
import { useNavigate} from 'react-router'

function CreateEmp() {
  
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState("")
  const navigate=useNavigate()
  const {register,handleSubmit,formState:{errors},}=useForm()

  //form submit
  const onFormSubmit = async (newEmpObj) => {
    try {
      setLoading(true);
      //make HTTP POST req
      let res = await fetch("/employee-api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmpObj),
      });

      if (res.status === 201) {
        //navigate to employees component programatically
        navigate("/list");
      } else {
        let errorRes = await res.json();
        console.log("error responce is ", errorRes);
        throw new Error(errorRes.reason);
      }
    } catch (err) {
      console.log("err in catch", err);
      //deal with err
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(error);

  if (loading) {
    return <p className="text-center text-4xl">Loading....</p>;
  }
  if (error) {
    return <p className="text-red-500 text-center text-3xl">{error}</p>;
  }

  return (
    <div className='text-center'>
      <h1 className='text-2xl mt-5'>Create New Employee</h1>
      <form className="w-full max-w-md mt-7 block mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
        <input type="text" placeholder='Enter name of employee' {...register("name")}  className='mb-3 border p-3 w-full rounded-2xl'/>
        <input type="email" placeholder='Enter employee email' {...register("email")}  className='mb-3 border p-3 w-full rounded-2xl'/>
        <input type="number" placeholder='Enter mobile number' {...register("mobile")} className='mb-3 border p-3 w-full rounded-2xl'/>
        <input type="text" placeholder='Enter designation' {...register("designation")} className='mb-3 border p-3 w-full rounded-2xl'/>        
        <input type="text" placeholder='Enter name of the company' {...register("companyName")} className='mb-3 border p-3 w-full rounded-2xl'/>
        <button type="submit" className='block mx-auto mt-5 bg-amber-500 rounded-2xl p-5'>Add Emp</button>
      </form>
    </div>
  )
}

export default CreateEmp