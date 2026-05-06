import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router'
import axios from 'axios'

function ListOfEmps() {
  
  const [emps,setEmps]=useState([])
  const navigate=useNavigate()

  const goToEmployee=(empObj)=>{
    //Navigate to /employee along with selected employee object
    navigate("/employee",{state:empObj})
  }

  const goToEditEmployee=(empObj)=>{
    navigate("/edit-emp",{state:empObj})
  }

  const deleteEmpById=async (id)=>{
      let res= await axios.delete(`/employee-api/employees/${id}`)
      if(res.status===200){
        // Remove the deleted employee from the local state list
        const updatedEmps = emps.filter(emp => emp._id !== id);
        setEmps(updatedEmps);
      }
    }

  useEffect(()=>{
    //Get all emps on component loading
    async function getEmps(){
      let res=await axios.get("/employee-api/employees")
      if(res.status===200){
        let resObj=res.data
        setEmps(resObj.payload)
      }
    }
    getEmps()
  },[])

  return (
    <div>
      <h1 className='text-4xl text-center'>List of Employees</h1>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-20'>
      {
        emps.map((empObj)=>(<div key={empObj._id} className='bg-red-300 rounded-2xl p-1.5 text-center mt-5'>
          <p className='text-blue-900'>{empObj.email}</p>
          <p className='mb-4 text-blue-900'>{empObj.name}</p>
          {/**3 buttons */}
          <div className='flex justify-around'>
            <button onClick={()=>goToEmployee(empObj)} className='bg-green-700 p-3 rounded-2xl text-white'>View</button>
            <button onClick={()=>goToEditEmployee(empObj)} className='bg-yellow-700 p-3 rounded-2xl text-white'>Edit</button>
            <button onClick={()=>deleteEmpById(empObj._id)} className='bg-red-700 p-3 rounded-2xl text-white'>Delete</button>
          </div>
        </div>)
      )}
      </div>
    </div>
  )
}

export default ListOfEmps