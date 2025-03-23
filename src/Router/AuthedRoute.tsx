import Applications from "@/pages/Applications"
import Error from "@/pages/Error"
import Home from "@/pages/Home"
import Layout from "@/pages/Layout"
import Payments from "@/pages/payments"
import Profile from "@/pages/Settings/Profile"
import Settings from "@/pages/Settings/Settings"
import Students from "@/pages/Students"
import { Route, Routes } from "react-router"

const AuthedRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/profile" element={<Profile />} />
        <Route path="/students" element={<Students />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="*" element={<Error />} />
        <Route path="/error" element={<Error />} />
      </Route>
    </Routes>
  )
}

export default AuthedRoute
