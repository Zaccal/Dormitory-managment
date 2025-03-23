import Authorization from "@/pages/Authorization"
import Error from "@/pages/Error"
import { Route, Routes } from "react-router"

const UnauthedRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Authorization />} />
      <Route path="*" element={<Error />} />
      <Route path="/error" element={<Error />} />
    </Routes>
  )
}

export default UnauthedRoute
