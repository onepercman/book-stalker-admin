import { useViewWidth } from "@/libs/custom-hooks/use-view-width"
import {
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
  cn,
} from "@nextui-org/react"
import { FC } from "react"
import { Link, useLocation } from "react-router-dom"

export const Sidebar: FC = () => {
  const { pathname } = useLocation()
  const vh = useViewWidth() || 0

  console.log()

  return (
    <NextUINavbar
      position="sticky"
      className={cn({ "text-primary": true })}
      classNames={
        vh < 640
          ? {}
          : {
              base: cn(
                "flex flex-col justify-start w-full h-full border-r border-divider bg-content1 sm:max-w-[260px] max-h-screen",
              ),
              content: "flex flex-col justify-start w-full h-full",
              wrapper:
                "flex flex-col justify-start items-start w-full h-full p-4",
              // brand: "flex justify-start items-center gap-3 max-w-fit",
              item: "flex w-full items-start justify-start",
              menu: "flex flex-col w-full gap-2",
              menuItem: "flex w-full items-start justify-start",
            }
      }
    >
      <NavbarContent className="flex w-full sm:hidden">
        <NavbarMenuToggle className="flex-none" />
      </NavbarContent>
      <NavbarContent justify="start" className="">
        <NavbarItem
          isActive={pathname === ""}
          className="flex w-full items-start justify-start"
          as={Link}
          to="/"
        >
          Quản lý sách
        </NavbarItem>
        <NavbarItem
          isActive={pathname === ""}
          className="flex w-full items-start justify-start"
          as={Link}
          to="/"
        >
          Quản lý thể loại
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem
          isActive={pathname === ""}
          className="flex w-full items-start justify-start"
          as={Link}
          to="/"
        >
          Quản lý sách
        </NavbarMenuItem>
        <NavbarMenuItem
          isActive={pathname === ""}
          className="flex w-full items-start justify-start"
          as={Link}
          to="/"
        >
          Quản lý thể loại
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  )
}
