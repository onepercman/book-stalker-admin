import { Service } from "@/services/app.service"
import { useQuery } from "@tanstack/react-query"

export function useCategories() {
  return useQuery({
    queryKey: ["category list"],
    async queryFn() {
      const { data } = await Service.category.list()
      return data
    },
  })
}
