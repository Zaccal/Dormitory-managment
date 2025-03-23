import { AppSidebar } from "@/components/shared/AppSidebar/AppSidebar"
import Header from "@/components/shared/Header"
import { SidebarInset } from "@/components/ui/sidebar"
import { Outlet } from "react-router"

const Layout = () => {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <Outlet />
      </SidebarInset>
    </>
  )
}

export default Layout
