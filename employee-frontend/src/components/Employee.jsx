import { useLocation } from "react-router"

function Employee() {
  const {state}=useLocation()
  console.log(state)
  return (
    <div className="p-16 text-3xl text-center text-orange-700 shadow-2xl">
      <h1 className="text-black mb-5 mt-7">Employee details</h1>
      <p>{state.name}</p>
      <p>{state.email}</p>
      <p>{state.mobile}</p>
      <p>{state.designation}</p>
      <p>{state.companyName}</p>
    </div>
  )
}

export default Employee