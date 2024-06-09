import userStore from "@/stores/user.store"
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react"
import { Container } from "mojaui"
import { FC, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { LuEye, LuEyeOff } from "react-icons/lu"

export const Login: FC = () => {
  const form = useForm<LoginDTO>()

  const [showPassword, setShowPassword] = useState(false)

  async function submit(dto: LoginDTO) {
    const { statusText } = await userStore.login(dto)
    if (statusText) {
      if (
        statusText.toLowerCase().includes("tài khoản") ||
        statusText.toLowerCase().includes("email")
      ) {
        form.setError("email", { message: statusText })
      } else {
        form.setError("password", { message: statusText })
      }
    }
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
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  variant="bordered"
                  label="Mật khẩu"
                  classNames={{ label: "text-secondary" }}
                  isInvalid={fieldState.invalid}
                  errorMessage={fieldState.error?.message}
                  endContent={
                    form.watch("password") ? (
                      <Button
                        size="sm"
                        variant="light"
                        isIconOnly
                        startContent={showPassword ? <LuEyeOff /> : <LuEye />}
                        onClick={() => setShowPassword((p) => !p)}
                      />
                    ) : null
                  }
                />
              )}
            />
            <Button
              size="lg"
              type="submit"
              color="primary"
              isLoading={form.formState.isSubmitting}
            >
              Đăng nhập
            </Button>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}
