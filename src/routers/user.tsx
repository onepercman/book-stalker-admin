import { useUserList } from "@/hooks/use-user-list"
import { toaster } from "@/libs/toast"
import { Service } from "@/services/app.service"
import {
  Button,
  Chip,
  Input,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import { Container, Dialog, Pagination, Switch } from "mojaui"
import { LuSearch, LuTrash } from "react-icons/lu"

export default function () {
  const {
    data,
    isFetching,
    searchText,
    setSearchText,
    page,
    setPage,
    refetch,
  } = useUserList()

  async function deleteItem(id: string) {
    const confirmed = await Dialog.confirm({
      question: "Bạn có chắc chắn xoá ?",
    })
    if (!confirmed) return
    const { data } = await Service.user.delete(id)
    if (data) {
      toaster.create({ type: "success", title: "Xoá thành công" })
      refetch()
    } else {
      toaster.create({ type: "error", title: "Xoá thất bại" })
    }
  }

  async function assignAdmin(id: string, isAdmin: boolean) {
    const confirmed = await Dialog.confirm({
      question: isAdmin ? "Chấp quyền quản trị ?" : "Bỏ quyền quản trị ?",
    })
    if (!confirmed) return
    const { data, statusText } = await Service.user.assignAdmin({ id, isAdmin })
    if (data) {
      toaster.create({ type: "success", title: "Cập nhật thành công" })
      refetch()
    } else {
      toaster.create({ type: "error", title: statusText })
    }
  }

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
          <TableColumn>Tên người dùng</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Quyền quản trị</TableColumn>
          <TableColumn>Chỉnh sửa</TableColumn>
        </TableHeader>
        <TableBody isLoading={isFetching} loadingContent={<Spinner />}>
          {
            data?.data.map((el, index) => (
              <TableRow key={el._id}>
                <TableCell>{index + (page - 1) * 20 + 1}</TableCell>
                <TableCell>{el.name}</TableCell>
                <TableCell>{el.email}</TableCell>
                <TableCell>
                  <Switch
                    checked={el.role === "admin"}
                    onCheckedChange={({ checked }) =>
                      assignAdmin(el._id, checked)
                    }
                  />
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Button
                    color="danger"
                    startContent={<LuTrash />}
                    isIconOnly
                    onClick={() => deleteItem(el._id)}
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
