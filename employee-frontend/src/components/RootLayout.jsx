import Header from "./Header"
import {Outlet} from "react-router"

function RootLayout() {
  return (
    <div>
        <Header/>
        <div className="min-h-screen mx-20 px-20 bg-gradient-to-br from-gray-100 to-gray-200 mt-5">
            <Outlet/>
        </div>
    </div>
  )
}

export default RootLayout