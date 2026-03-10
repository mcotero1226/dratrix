import { Outlet } from "react-router-dom"
import MenuHome from "./menu"


const Layaut = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">

      <aside className="w-64 bg-white shadow-md">
        <MenuHome />
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>



    </div>
  )
}

export { Layaut }
