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
  useDisclosure,
} from "@nextui-org/react"
import { FC, Fragment } from "react"
import { Controller, useForm } from "react-hook-form"
import { LuListPlus, LuPlus } from "react-icons/lu"

const defaultValues: Partial<Category> = {
  name: "",
  image: "",
}

export const AddCategory: FC = () => {
  const { isOpen, onOpenChange, getButtonProps } = useDisclosure()

  const { refetch } = useCategories()

  const form = useForm<Category>({ defaultValues })

  async function submit(category: Category) {
    const { data } = await Service.category.create(category)
    if (data) {
      form.reset()
      onOpenChange()
      toaster.create({ type: "success", title: "Tạo thể loại thành công" })
      refetch()
    } else {
      toaster.create({ type: "error", title: "Tạo thể loại thất bại" })
    }
  }

  async function uploadThumbnail() {
    const file = await browseTextFile()
    if (!file) return
    const loading = toaster.create({ type: "loading", title: "Đang tải lên" })
    const { data } = await Service.book.upload(file)
    if (data) {
      form.setValue("image", data)
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
        Thêm thể loại mới
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={function () {
          form.reset({})
          onOpenChange()
        }}
      >
        <ModalContent as="form" onSubmit={form.handleSubmit(submit)}>
          <ModalHeader>Thêm thể loại mới</ModalHeader>
          <ModalBody>
            <Controller
              control={form.control}
              name="name"
              rules={{
                required: "Nhập tên thể loại",
              }}
              render={({ field, fieldState }) => (
                <Input
                  label="Tên thể loại"
                  {...field}
                  isInvalid={fieldState.invalid}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />
            <label>Ảnh bìa</label>
            <div
              role="button"
              className="group relative aspect-[5/4] h-40 rounded border border-dashed border-line hover:border-primary"
              onClick={uploadThumbnail}
            >
              {form.watch("image") ? (
                <img
                  src={form.watch("image")}
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
