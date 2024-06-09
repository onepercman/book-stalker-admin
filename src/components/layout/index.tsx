import { useStore } from "@/libs/valtio"
import userStore from "@/stores/user.store"
import { Button, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider, useTheme } from "next-themes"
import { FC, Fragment } from "react"
import { LuMoon, LuSun } from "react-icons/lu"
import { Outlet, useNavigate } from "react-router-dom"
import { Login } from "./login"
import { Sidebar } from "./sidebar"

export const Layout: FC = () => {
  const navigate = useNavigate()
  const { jwt } = useStore(userStore)

  return (
    <ThemeProvider defaultTheme="light">
      <NextUIProvider navigate={navigate}>
        {jwt ? (
          <Fragment>
            <Sidebar />
            <Outlet />
          </Fragment>
        ) : (
          <Login />
        )}
        <ToggleTheme />
      </NextUIProvider>
    </ThemeProvider>
  )
}

function ToggleTheme() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      size="sm"
      onClick={function () {
        setTheme(theme === "dark" ? "light" : "dark")
      }}
      isIconOnly
      className="fixed bottom-4 right-4"
    >
      {theme === "dark" ? <LuSun /> : <LuMoon />}
    </Button>
  )
}
