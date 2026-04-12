import { NavLink } from "react-router"

function Header() {
  return (
    <div>
    <nav className="flex justify-end gap-7 p-5 bg-white shadow-md text-2xl">
        <NavLink to="" className={({isActive})=>isActive?"text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1":"text-gray-700 hover:text-indigo-600 transition"}>Home</NavLink>
        <NavLink to="create-emp" className={({isActive})=>isActive?"text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1":"text-gray-700 hover:text-indigo-600 transition"}>Create Employee</NavLink>
        <NavLink to="list" className={({isActive})=>isActive?"text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1":"text-gray-700 hover:text-indigo-600 transition"}>List Of Employees</NavLink>
    </nav>
    </div>
  )
}

export default Header