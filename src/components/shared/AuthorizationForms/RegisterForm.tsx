import { Button } from "@/components/ui/button"
import { InputWithLabel } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import useRequestRegister from "@/hooks/useRequestRegister"
import { IRequestRegister } from "@/types/supabase-tables.types"
import { SubmitHandler, useForm } from "react-hook-form"
import Loader from "../Loader"

const RegisterForm = () => {
  const { mutateAsync, isPending } = useRequestRegister()
  const { toast } = useToast()
  const {
    formState: { errors },
    reset,
    register,
    handleSubmit,
  } = useForm<IRequestRegister>()

  const submitHandler: SubmitHandler<IRequestRegister> = async (data, event) => {
    event?.preventDefault()

    await mutateAsync(data)
    reset()
    toast({
      title: "Заявка принята на рассмотрение.",
      description:
        "Процесс обработки может занять несколько дней. Мы отправим вам логин, пароль и информацию о статусе заявки (принята или отклонена) на указанный телефон в WhatsApp.",
      variant: "success",
    })
  }

  return (
    <form action="POST" onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-7">
      <div className="grid grid-cols-2 gap-y-6 gap-x-4">
        <InputWithLabel
          placeholder="Введите ваше имя"
          disabled={isPending}
          label={errors.first_name ? (errors.first_name.message as string) : "Имя *"}
          variant={errors.first_name ? "error" : "defualt"}
          htmlFor="name"
          {...register("first_name", {
            required: "Введите имя",
            minLength: {
              value: 2,
              message: "Введите хотябы две буквы",
            },
            pattern: {
              value: /^[А-Яа-яӘәӨөҮүҰұҚқҒғҢңІіA-Za-z]+$/i,
              message: "Введите только буквы",
            },
          })}
        />
        <InputWithLabel
          label={errors.phone ? (errors.phone.message as string) : "Номер телефона (WhatsApp) *"}
          variant={errors.phone ? "error" : "defualt"}
          disabled={isPending}
          placeholder="+7 000 000 00 00"
          htmlFor="phone"
          {...register("phone", {
            required: "Введите свой телефон",
            pattern: {
              value: /^(\+7|8)\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/,
              message: "Не коректный формат",
            },
          })}
        />
        <InputWithLabel
          label={errors.patronymic ? (errors.patronymic.message as string) : "Отчество"}
          variant={errors.patronymic ? "error" : "defualt"}
          placeholder="Введите ваше отчество"
          disabled={isPending}
          {...register("patronymic", {
            minLength: {
              value: 2,
              message: "Введите хотябы две буквы",
            },
            pattern: {
              value: /^[А-Яа-яӘәӨөҮүҰұҚқҒғҢңІіA-Za-z]+$/i,
              message: "Используйте только буквы",
            },
          })}
          htmlFor="patronymic"
        />

        <InputWithLabel
          placeholder="+7 000 000 00 00"
          label={
            errors.phone_father
              ? (errors.phone_father.message as string)
              : "Номер телеофна отца (WhatsApp)"
          }
          variant={errors.phone_father ? "error" : "defualt"}
          disabled={isPending}
          htmlFor="phone-father"
          {...register("phone_father", {
            required: "Введите телефон отца",
            pattern: {
              value: /^(\+7|8)\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/,
              message: "Не коректный формат",
            },
          })}
        />
        <InputWithLabel
          label={errors.last_name ? (errors.last_name.message as string) : "Фамилия *"}
          variant={errors.last_name ? "error" : "defualt"}
          placeholder="Введите вашу фамилию"
          disabled={isPending}
          htmlFor="lastname"
          {...register("last_name", {
            required: "Введите фамилию",
            minLength: {
              value: 2,
              message: "Введите хотябы две буквы",
            },
            pattern: {
              value: /^[А-Яа-яӘәӨөҮүҰұҚқҒғҢңІіA-Za-z]+$/i,
              message: "Используйте только буквы",
            },
          })}
        />

        <InputWithLabel
          label={
            errors.phone_mother
              ? (errors.phone_mother.message as string)
              : "Номер телефона матери (WhatsApp)"
          }
          variant={errors.phone_mother ? "error" : "defualt"}
          placeholder="+7 000 000 00 00"
          disabled={isPending}
          htmlFor="phone-mather"
          {...register("phone_mother", {
            required: "Введите телефон матери",
            pattern: {
              value: /^(\+7|8)\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/,
              message: "Не коректный формат",
            },
          })}
        />

        <InputWithLabel
          label={errors.address ? (errors.address.message as string) : "Адрес дома *"}
          variant={errors.address ? "error" : "defualt"}
          htmlFor="address"
          disabled={isPending}
          placeholder="Улица, Город, Номер, Дом"
          {...register("address", {
            required: "Введите адрес дома",
          })}
        />

        <InputWithLabel
          type="email"
          htmlFor="email"
          label={errors.email ? (errors.email.message as string) : "Почта *"}
          variant={errors.email ? "error" : "defualt"}
          disabled={isPending}
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Некоректная почта",
            },
            required: "Введите почту",
          })}
          placeholder="example@mail.com"
        />
      </div>

      <Button disabled={isPending} type="submit" className="w-full mt-5">
        {isPending && <Loader className="w-5 h-5" />}
        {!isPending && "Подать заявку"}
      </Button>
    </form>
  )
}

export default RegisterForm
