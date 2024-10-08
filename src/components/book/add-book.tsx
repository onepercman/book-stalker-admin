import { useBookList } from "@/hooks/use-book-list"
import { useCategories } from "@/hooks/use-categories"
import { toaster } from "@/libs/toast"
import { Service } from "@/services/app.service"
import { browseTextFile } from "@/utils/file"
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react"
import { FC, Fragment } from "react"
import { Controller, useForm } from "react-hook-form"
import { LuListPlus, LuPlus, LuUpload } from "react-icons/lu"

const defaultValues: Partial<Book> = {
  name: "",
  categoryId: "",
  thumbnail: "",
  uri: "",
}

export const AddBook: FC = () => {
  const { data: categories } = useCategories()
  const { isOpen, onOpenChange, getButtonProps } = useDisclosure()

  const { refetch } = useBookList()

  const form = useForm<Book>({ defaultValues })

  async function submit(book: Book) {
    const { data } = await Service.book.create(book)
    if (data) {
      form.reset()
      onOpenChange()
      toaster.create({ type: "success", title: "Tạo sách mới thành công" })
      refetch()
    } else {
      toaster.create({ type: "error", title: "Tạo sách thất bại" })
    }
  }

  async function upload() {
    const file = await browseTextFile()
    if (!file) return
    const loading = toaster.create({ type: "loading", title: "Đang tải lên" })
    const { data } = await Service.book.upload(file)
    if (data) {
      form.setValue("uri", data)
    } else {
      toaster.create({ type: "error", title: "Tải file thất bại" })
    }
    toaster.dismiss(loading)
  }

  async function uploadThumbnail() {
    const file = await browseTextFile()
    if (!file) return
    const loading = toaster.create({ type: "loading", title: "Đang tải lên" })
    const { data } = await Service.book.upload(file)
    if (data) {
      form.setValue("thumbnail", data)
    } else {
      toaster.create({ type: "error", title: "Tải file thất bại" })
    }
    toaster.dismiss(loading)
  }

  return (
    <Fragment>
      <Button
        size="sm"
        color="primary"
        endContent={<LuListPlus />}
        className="self-end"
        {...getButtonProps()}
      >
        Thêm sách mới
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={function () {
          form.reset({})
          onOpenChange()
        }}
      >
        <ModalContent as="form" onSubmit={form.handleSubmit(submit)}>
          <ModalHeader>Thêm sách mới</ModalHeader>
          <ModalBody>
            <Controller
              control={form.control}
              name="name"
              rules={{
                required: "Nhập tên sách",
              }}
              render={({ field, fieldState }) => (
                <Input
                  label="Tên sách"
                  {...field}
                  isInvalid={fieldState.invalid}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
            <Controller
              control={form.control}
              name="categoryId"
              rules={{
                required: "Chọn thể loại",
              }}
              render={({ field, fieldState }) => (
                <Select
                  label="Thể loại"
                  className="min-w-40 basis-0"
                  {...field}
                  isInvalid={fieldState.invalid}
                  errorMessage={fieldState.error?.message}
                >
                  {
                    categories?.map((el) => (
                      <SelectItem key={el._id}>{el.name}</SelectItem>
                    )) as any
                  }
                </Select>
              )}
            />
            <Controller
              control={form.control}
              name="uri"
              rules={{
                required: "Nhập URI",
              }}
              render={({ field, fieldState }) => (
                <Input
                  label="URI"
                  {...field}
                  isInvalid={fieldState.invalid}
                  errorMessage={fieldState.error?.message}
                  endContent={
                    <Button
                      startContent={<LuUpload />}
                      isIconOnly
                      onClick={upload}
                    />
                  }
                />
              )}
            />
            <label>Ảnh bìa</label>
            <div
              role="button"
              className="group relative aspect-[5/4] h-40 rounded border border-dashed border-line hover:border-primary"
              onClick={uploadThumbnail}
            >
              {form.watch("thumbnail") ? (
                <img
                  src={form.watch("thumbnail")}
                  className="h-full w-full object-contain"
                />
              ) : null}

              <LuPlus className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:text-primary" />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onOpenChange}>Huỷ</Button>
            <Button
              color="primary"
              type="submit"
              isLoading={form.formState.isSubmitting}
            >
              Thêm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  )
}
