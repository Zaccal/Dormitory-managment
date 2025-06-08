import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar'
import { useEffect } from 'react'
import { Link, NavLink } from 'react-router'
import NavUser from './NavUser/NavUser'
import { SIDEBAR_ITEMS } from '@/lib/constants'
import { Settings } from 'lucide-react'

export function AppSidebar() {
    const { open } = useSidebar()

    useEffect(() => {
        localStorage.setItem('sidebar:state', JSON.stringify(open))
    }, [open])

    return (
        <Sidebar
            variant="inset"
            className="dark:border-r border-r-border"
            collapsible="icon"
        >
            <SidebarHeader>
                <NavUser />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Навигация</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {SIDEBAR_ITEMS.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            className={({ isActive }) => {
                                                return isActive
                                                    ? 'bg-accent'
                                                    : ''
                                            }}
                                            to={item.url}
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link to="/settings">
                            <Settings />
                            <span>Настройки</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarFooter>
        </Sidebar>
    )
}
