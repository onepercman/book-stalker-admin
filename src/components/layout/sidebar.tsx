import userStore from "@/stores/user.store"
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react"
import { FC } from "react"
import { LuLogOut } from "react-icons/lu"
import { Link, useLocation } from "react-router-dom"

export const Sidebar: FC = () => {
  const { pathname } = useLocation()

  return (
    <Navbar
      className="bg-content1 shadow"
      classNames={{
        item: "px-3 py-2 rounded hover:text-primary data-[active]:bg-primary transition-colors data-[active]:text-white data-[active]:hover:text-white",
        menuItem:
          "px-3 py-2 rounded hover:text-primary data-[active]:bg-primary transition-colors data-[active]:text-white data-[active]:hover:text-white",
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <Link to="/">LOGO</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-2 sm:flex" justify="start">
        <NavbarItem isActive={pathname === "/book"}>
          <Link to="/book">Quản lý sách</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/category"}>
          <Link to="/category">Quản lý thể loại</Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/user"}>
          <Link to="/user">Quản lý người dùng</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <Button
          color="danger"
          endContent={<LuLogOut />}
          onClick={() => userStore.logout()}
        >
          Đăng xuất
        </Button>
      </NavbarContent>

      <NavbarMenu className="bg-content1">
        <NavbarMenuItem isActive={pathname === "/book"}>
          <Link to="/book">Quản lý sách</Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathname === "/category"}>
          <Link to="/category">Quản lý thể loại</Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={pathname === "/user"}>
          <Link to="/user">Quản lý người dùng</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}
