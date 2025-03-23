import { Bell } from "lucide-react"
import { Link } from "react-router"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { SidebarTrigger } from "../ui/sidebar"
import Container from "./Container"

const Header = () => {
  return (
    <header className="border-b border-border">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-6" />
            <Link to={"/"}>
              <img src="/logo.png" alt="logo" className="w-32 md:w-40 py-4" />
            </Link>
          </div>

          <Button
            className="relative dark:border-0 dark:bg-accent dark:text-secondary"
            size={"icon"}
            variant={"outline"}
          >
            <Bell size={32} />
            <div className="rounded-full bg-primary dark:bg-destructive text-white font-bold px-1 py-0.5 text-[12px] absolute -top-2 -right-2">
              22
            </div>
          </Button>
        </div>
      </Container>
    </header>
  )
}

export default Header
