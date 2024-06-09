import { useCategories } from "@/hooks/use-categories"
import { useDebounce } from "@/libs/custom-hooks/use-debounce"
import { Service } from "@/services/app.service"
import {
  Button,
  Chip,
  Input,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { Container, Pagination } from "mojaui"
import { useState } from "react"
import { LuFileEdit, LuListPlus, LuSearch, LuTrash } from "react-icons/lu"

export default function () {
  const { data: categories } = useCategories()

  const [categoryId, setCategoryId] = useState<string>()
  const [searchText, setSearchText] = useState<string>()
  const search = useDebounce(searchText, 500)
  const [page, setPage] = useState<number>(1)

  const { data, isFetching } = useQuery({
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

  function _renderTop() {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4">
          <Input
            className="min-w-80 grow basis-0"
            placeholder="Tìm kiếm"
            endContent={<LuSearch />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            placeholder="Mọi thể loại"
            selectedKeys={new Set([categoryId]) as any}
            className="min-w-40 basis-0"
            onSelectionChange={function (key: any) {
              setPage(1)
              setCategoryId(key.currentKey)
            }}
          >
            {
              categories?.map((el) => (
                <SelectItem key={el._id}>{el.name}</SelectItem>
              )) as any
            }
          </Select>
        </div>
        <div className="flex flex-wrap justify-between gap-6">
          <div className="inline-flex items-center gap-2">
            <Chip size="lg">{data?.count || 0} bản ghi</Chip>
            <Pagination
              size="sm"
              count={data?.count || 0}
              page={page}
              pageSize={20}
              onPageChange={({ page }) => setPage(page)}
            />
          </div>
          <Button
            size="sm"
            color="primary"
            endContent={<LuListPlus />}
            className="self-end"
          >
            Thêm sách mới
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Container className="space-y-6">
      <div className="text-xl font-semibold">Danh sách ebook</div>
      {_renderTop()}
      <Table>
        <TableHeader>
          <TableColumn>
            <span></span>
          </TableColumn>
          <TableColumn>Ảnh bìa</TableColumn>
          <TableColumn>Tên sách</TableColumn>
          <TableColumn>Thể loại</TableColumn>
          <TableColumn>Chỉnh sửa</TableColumn>
        </TableHeader>
        <TableBody isLoading={isFetching} loadingContent={<Spinner />}>
          {
            data?.data.map((el, index) => (
              <TableRow key={el._id}>
                <TableCell>{index + (page - 1) * 20 + 1}</TableCell>
                <TableCell>
                  <img src={el.thumbnail} className="h-12 w-8 object-cover" />
                </TableCell>
                <TableCell>{el.name}</TableCell>
                <TableCell>{el.category?.name}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Button
                    color="success"
                    startContent={<LuFileEdit />}
                    isIconOnly
                  />
                  <Button
                    color="danger"
                    startContent={<LuTrash />}
                    isIconOnly
                  />
                </TableCell>
              </TableRow>
            )) as any
          }
        </TableBody>
      </Table>
    </Container>
  )
}
