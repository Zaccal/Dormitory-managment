import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/useAuth"
import useProfile from "@/hooks/useProfile"
import { ChevronsUpDown, CircleUser, LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router"
import SkeletonText from "../SkeletonText"

const NavUser = () => {
  const { data: user, isLoading, isError } = useProfile()
  const router = useNavigate()
  const { signOut } = useAuth()
  const { isMobile } = useSidebar()

  if (isError || !user) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size={"lg"}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {!isLoading ? (
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user?.photo_face || undefined} />
                  <AvatarFallback className="rounded-lg">
                    {user?.first_name[0].toLocaleUpperCase() ||
                      "?" + user?.last_name[0].toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <SkeletonText className="w-8 h-8 flex aspect-square size-8" />
              )}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {!isLoading ? (
                    user?.first_name + " " + user?.last_name
                  ) : (
                    <SkeletonText className="w-36 h-2.5" />
                  )}
                </span>
                {!isLoading ? (
                  <span className="truncate text-muted-foreground text-xs">{user?.email}</span>
                ) : (
                  <SkeletonText className="w-20 mt-1.5 h-2.5" />
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg dark:border-border"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {!isLoading ? (
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.photo_face || undefined} />
                    <AvatarFallback className="rounded-lg">
                      {user!.first_name[0].toLocaleUpperCase() +
                        user!.last_name[0].toLocaleUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <SkeletonText className="w-8 h-8 flex aspect-square size-8" />
                )}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {!isLoading ? (
                      user?.first_name + " " + user?.last_name
                    ) : (
                      <SkeletonText className="w-36 h-2.5" />
                    )}
                  </span>
                  {!isLoading ? (
                    <span className="truncate text-xs">{user?.email}</span>
                  ) : (
                    <SkeletonText className="w-20 mt-1.5 h-2.5" />
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to={"/settings/profile"}>
                <DropdownMenuItem>
                  <CircleUser />
                  Профиль
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  const singoutAsync = async () => {
                    await signOut()
                    router("/")
                  }

                  singoutAsync()
                }}
                className="transition-colors hover:!text-destructive"
              >
                <LogOut />
                Выход
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default NavUser
