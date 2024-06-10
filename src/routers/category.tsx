import { AddCategory } from "@/components/category/add-category"
import { EditCategory } from "@/components/category/edit-category"
import { useCategories } from "@/hooks/use-categories"
import { toaster } from "@/libs/toast"
import { Service } from "@/services/app.service"
import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"
import { Container, Dialog } from "mojaui"
import { LuTrash } from "react-icons/lu"

export default function () {
  const { data, isFetching, refetch } = useCategories()

  async function deleteItem(id: string) {
    const confirmed = await Dialog.confirm({
      question: "Mọi cuốn sách của thể loại này sẽ bị xoá ?",
    })
    if (!confirmed) return
    const { data } = await Service.category.delete(id)
    if (data) {
      toaster.create({ type: "success", title: "Xoá thành công" })
      refetch()
    } else {
      toaster.create({ type: "success", title: "Xoá thành công" })
    }
  }

  return (
    <Container className="flex flex-col gap-6">
      <div className="text-xl font-semibold">Danh sách thể loại</div>
      <AddCategory />
      <Table>
        <TableHeader>
          <TableColumn>
            <span></span>
          </TableColumn>
          <TableColumn>Ảnh bìa</TableColumn>
          <TableColumn>Tên thể loại</TableColumn>
          <TableColumn>Chỉnh sửa</TableColumn>
        </TableHeader>
        <TableBody isLoading={isFetching} loadingContent={<Spinner />}>
          {
            data?.map((el, index) => (
              <TableRow key={el._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img src={el.image} className="h-12 w-8 object-cover" />
                </TableCell>
                <TableCell>{el.name}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <EditCategory category={el} />
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
