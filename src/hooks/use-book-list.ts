import { useDebounce } from "@/libs/custom-hooks/use-debounce"
import { Service } from "@/services/app.service"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export function useBookList() {
  const [categoryId, setCategoryId] = useState<string>()
  const [searchText, setSearchText] = useState<string>()
  const search = useDebounce(searchText, 500)
  const [page, setPage] = useState<number>(1)

  const query = useQuery({
    queryKey: ["book list", page, search, categoryId],
    async queryFn() {
      const { data } = await Service.book.list({
        search,
        categoryId,
        page,
        take: 20,
      })
      return data
    },
  })

  return {
    ...query,
    categoryId,
    setCategoryId,
    searchText,
    setSearchText,
    page,
    setPage,
  }
}
