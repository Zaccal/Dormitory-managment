import {
  BedSingle,
  BookUser,
  CircleDollarSign,
  Home,
  Receipt,
  Settings,
  Users,
} from "lucide-react";

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
} from "@/components/ui/sidebar";
import { useEffect } from "react";
import { Link, NavLink } from "react-router";
import NavUser from "./NavUser";

const items = [
  {
    title: "Главная",
    url: "/",
    icon: Home,
  },
  {
    title: "Студенты",
    url: "/students",
    icon: Users,
  },
  {
    title: "Комнаты",
    url: "/rooms",
    icon: BedSingle,
  },
  {
    title: "Завяки",
    url: "/applications",
    icon: BookUser,
  },
  {
    title: "Оплата",
    url: "/payments",
    icon: CircleDollarSign,
  },
  {
    title: "Чеки",
    url: "/bills",
    icon: Receipt,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();

  useEffect(() => {
    localStorage.setItem("sidebar:state", JSON.stringify(open));
  }, [open]);

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
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      className={({ isActive, isPending }) => {
                        console.log(isActive, isPending);

                        return isActive ? "bg-accent" : "";
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
  );
}
