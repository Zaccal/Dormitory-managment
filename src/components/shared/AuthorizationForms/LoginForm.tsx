import { Button } from "@/components/ui/button"
import { InputWithLabel } from "@/components/ui/input"
import { SignInData, useAuth } from "@/hooks/useAuth"
import { SubmitHandler, useForm } from "react-hook-form"
import Loader from "../Loader"

const LoginForm = () => {
  const {
    signIn,
    signInMutation: { isPending, isError, error },
  } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInData>()

  const submitHandler: SubmitHandler<SignInData> = async (data, event) => {
    event?.preventDefault()
    await signIn(data)

    if (!isError) {
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-6">
      {error && (
        <div className="px-4 py-2 text-white bg-destructive rounded-sm">
          <h3>
            {error?.message == "Invalid login credentials"
              ? "Введен неверный логин или пароль, повторите попытку"
              : `Ошипка: ${error.message}, (${error.status})`}
          </h3>
        </div>
      )}
      <InputWithLabel
        disabled={isPending}
        type="email"
        {...register("email", {
          required: "Ведите почту",
        })}
        placeholder="example@mail.com"
        htmlFor="email"
        variant={errors.password ? "error" : "defualt"}
        label={errors.email ? (errors.email.message as string) : "Почта"}
      />
      <InputWithLabel
        type="password"
        label={errors.password ? (errors.password.message as string) : "Пароль"}
        {...register("password", {
          required: "Введите пароль",
        })}
        disabled={isPending}
        htmlFor="password"
        variant={errors.password ? "error" : "defualt"}
      />
      <Button disabled={isPending} type="submit" className="w-full mt-5">
        {isPending && <Loader className="w-5 h-5" />}
        {!isPending && "Вход"}
      </Button>
    </form>
  )
}

export default LoginForm
