import { useDebounce } from "@/libs/custom-hooks/use-debounce"
import { Service } from "@/services/app.service"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

export function useUserList() {
  const [searchText, setSearchText] = useState<string>()
  const search = useDebounce(searchText, 500)
  const [page, setPage] = useState<number>(1)

  const query = useQuery({
    queryKey: ["user list", page, search],
    async queryFn() {
      const { data } = await Service.user.list({
        search,
        page,
        take: 20,
      })
      return data
    },
  })

  return {
    ...query,
    searchText,
    setSearchText,
    page,
    setPage,
  }
}
