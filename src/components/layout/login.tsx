import { Container } from "@/libs/ui/container"
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react"
import { FC } from "react"
import { Controller, useForm } from "react-hook-form"

export const Login: FC = () => {
  const form = useForm<LoginDTO>({
    mode: "onBlur",
  })

  async function submit({ email, password }: LoginDTO) {
    alert(email + " " + password)
  }

  return (
    <div className="flex min-h-screen">
      <Container size="md" className="m-auto p-6">
        <Card className="p-8">
          <CardHeader className="text-2xl font-semibold">Đăng nhập</CardHeader>
          <CardBody
            as="form"
            className="space-y-4"
            onSubmit={form.handleSubmit(submit)}
          >
            <Controller
              control={form.control}
              name="email"
              rules={{
                required: "Hãy nhập email của bạn",
                pattern: {
                  value: /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Hãy nhập email hợp lệ",
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  isInvalid={fieldState.invalid}
                  errorMessage={fieldState.error?.message}
                  variant="bordered"
                  label="Email"
                  classNames={{ label: "text-secondary" }}
                />
              )}
            />
            <Controller
              control={form.control}
              name="password"
              rules={{
                required: "Hãy nhập mật khẩu của bạn",
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  variant="bordered"
                  label="Mật khẩu"
                  classNames={{ label: "text-secondary" }}
                />
              )}
            />
            <Button size="lg" type="submit" color="primary">
              Đăng nhập
            </Button>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}
