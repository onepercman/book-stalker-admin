import { Layout } from "@/components/layout"
import NotFound from "@/routers/not-found"
import { Navigate, createBrowserRouter } from "react-router-dom"
import Book from "./routers/book"
import Category from "./routers/category"
import User from "./routers/user"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        index: true,
        element: <Navigate to="/book" />,
      },
      {
        path: "/book",
        element: <Book />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/user",
        element: <User />,
      },
    ],
  },
])
