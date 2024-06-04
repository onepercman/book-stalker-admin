import { useViewWidth } from "@/libs/custom-hooks/use-view-width"
import { cn } from "@/libs/one-ui/utils"
import { useStore } from "@/libs/valtio"
import userStore from "@/stores/user.store"
import { Button, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider, useTheme } from "next-themes"
import { FC } from "react"
import { LuMoon, LuSun } from "react-icons/lu"
import { Outlet, useNavigate } from "react-router-dom"
import { Login } from "./login"
import { Sidebar } from "./sidebar"

export const Layout: FC = () => {
  const navigate = useNavigate()
  const { jwt } = useStore(userStore)

  const vh = useViewWidth() || 0
  const panelMainClass = cn(
    "flex flex-col w-full h-full max-h-screen overflow-y-auto bg-base-100 transition-all",
  )

  return (
    <ThemeProvider defaultTheme="light">
      <NextUIProvider navigate={navigate}>
        {!jwt ? (
          <div
            className={cn(
              "animate-in fade-in flex h-screen max-h-screen w-full items-start justify-start duration-1000 ease-out",
              vh < 640 ? "flex-col" : "",
            )}
          >
            <Sidebar />
            <main className={panelMainClass}>
              <Outlet />
            </main>
          </div>
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
