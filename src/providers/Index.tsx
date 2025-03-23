import { SidebarProvider } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/hooks/theme-provider"
import { AuthProvider } from "@/hooks/useAuth"
import { ReactNode } from "react"
import { BrowserRouter } from "react-router"
import QueryProviderClient from "./QueryProviderClient"

interface IGlobalProvider {
  children: ReactNode
}

const GlobalProvider = ({ children }: IGlobalProvider) => {
  const sidebarState = JSON.parse(localStorage.getItem("sidebar:state") || "true")

  return (
    <QueryProviderClient>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider defaultTheme="light">
            <SidebarProvider defaultOpen={sidebarState}>{children}</SidebarProvider>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryProviderClient>
  )
}

export default GlobalProvider
