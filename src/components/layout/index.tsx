import { useStore } from "@/libs/valtio"
import userStore from "@/stores/user.store"
import { NextUIProvider } from "@nextui-org/react"
import { ThemeProvider } from "next-themes"
import { FC } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Login } from "./login"

export const Layout: FC = () => {
  const navigate = useNavigate()

  const { jwt } = useStore(userStore)

  return (
    <ThemeProvider defaultTheme="light">
      <NextUIProvider navigate={navigate}>
        {jwt ? <Outlet /> : <Login />}
      </NextUIProvider>
    </ThemeProvider>
  )
}
