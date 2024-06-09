import { useCategories } from "@/hooks/use-categories"
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
import { LuListPlus, LuUpload } from "react-icons/lu"

const defaultValues: Partial<Book> = {
  name: "",
  categoryId: "",
  thumbnail: "",
  uri: "",
}

export const AddBook: FC = () => {
  const { data: categories } = useCategories()
  const { isOpen, onOpenChange, getButtonProps } = useDisclosure()

  const form = useForm<Book>({ defaultValues })

  async function submit({}: Book) {
    // reset
    form.reset()
    onOpenChange()
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
                      onClick={async function () {
                        const file = await browseTextFile()
                        console.log({ file })
                      }}
                    />
                  }
                />
              )}
            />
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
