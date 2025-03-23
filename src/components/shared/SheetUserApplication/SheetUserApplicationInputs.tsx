import { InputWithLabel } from "@/components/ui/input"
import { Database } from "@/types/supabase.types"
import { FieldErrors, UseFormRegister } from "react-hook-form"

export interface ISheetForm extends Omit<Database["public"]["Tables"]["requests"]["Row"], "id"> {
  room_number: number
}

interface ISheetUserApplicationInputs {
  data: Database["public"]["Tables"]["requests"]["Row"]
  register: UseFormRegister<ISheetForm>
  errors: FieldErrors<ISheetForm>
  isPending: boolean
}

const SheetUserApplicationInputs = ({
  data,
  register,
  errors,
  isPending,
}: ISheetUserApplicationInputs) => {
  return (
    <>
      <InputWithLabel
        {...register("first_name", {
          required: {
            value: true,
            message: "Введите имя",
          },
        })}
        disabled={isPending}
        htmlFor="firstName"
        variant={errors.first_name ? "error" : "defualt"}
        label={errors.first_name ? (errors.first_name.message as string) : "Имя"}
        placeholder="Имя студента"
        defaultValue={data.first_name}
      />
      <InputWithLabel
        {...register("last_name", {
          required: {
            value: true,
            message: "Введите фамилию",
          },
        })}
        htmlFor="lastName"
        variant={errors.last_name ? "error" : "defualt"}
        label={errors.last_name ? (errors.last_name.message as string) : "Фамилия"}
        disabled={isPending}
        placeholder="Фамилия студента"
        defaultValue={data.last_name}
      />
      <InputWithLabel
        {...register("patronymic")}
        htmlFor="patronymic"
        label={errors.patronymic ? (errors.patronymic.message as string) : "Отчество"}
        disabled={isPending}
        variant={errors.patronymic ? "error" : "defualt"}
        placeholder="Отсуствует"
        defaultValue={data.patronymic || ""}
      />
      <InputWithLabel
        {...register("email", {
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Некоректная почта",
          },
          required: "Введите почту",
        })}
        disabled={isPending}
        htmlFor="email"
        variant={errors.email ? "error" : "defualt"}
        label={errors.email ? (errors.email.message as string) : "Почта"}
        placeholder="Почта студента"
        defaultValue={data.email}
      />
      <InputWithLabel
        {...register("phone", {
          required: "Введите телефон",
          pattern: {
            value: /^(\+7|8)\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/,
            message: "Не коректный формат",
          },
        })}
        disabled={isPending}
        variant={errors.phone ? "error" : "defualt"}
        htmlFor="phone"
        label={errors.phone ? (errors.phone.message as string) : "Телефон"}
        placeholder="+7 000 000 00 00"
        defaultValue={data.phone}
      />
      <InputWithLabel
        variant={errors.phone_mother ? "error" : "defualt"}
        disabled={isPending}
        htmlFor="phoneMother"
        label={errors.phone_mother ? (errors.phone_mother.message as string) : "Телефон матери"}
        placeholder="+7 000 000 00 00"
        {...register("phone_mother", {
          required: "Введите телефон",
          pattern: {
            value: /^(\+7|8)\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/,
            message: "Не коректный формат",
          },
        })}
        defaultValue={data.phone_mother}
      />

      <InputWithLabel
        variant={errors.phone_father ? "error" : "defualt"}
        htmlFor="phoneFather"
        disabled={isPending}
        label={errors.phone_father ? (errors.phone_father.message as string) : "Телефон отца"}
        {...register("phone_father", {
          required: "Введите телефон",
          pattern: {
            value: /^(\+7|8)\s?\d{3}\s?\d{3}\s?\d{2}\s?\d{2}$/,
            message: "Не коректный формат",
          },
        })}
        placeholder="+7 000 000 00 00"
        defaultValue={data.phone_father}
      />

      <InputWithLabel
        htmlFor="address"
        {...register("address", {
          required: "Введите адрес дома",
        })}
        variant={errors.address ? "error" : "defualt"}
        disabled={isPending}
        label={errors.address ? (errors.address.message as string) : "Аддрес проживания"}
        placeholder="Аддрес студента"
        defaultValue={data.address}
      />

      <InputWithLabel
        htmlFor="address"
        {...register("room_number", {
          required: "Введите номер комнаты",
        })}
        variant={errors.room_number ? "error" : "defualt"}
        disabled={isPending}
        label={errors.room_number ? (errors.room_number.message as string) : "Аддрес проживания"}
        placeholder="Комната (202-214) (302-314)"
        type="number"
      />
    </>
  )
}

export default SheetUserApplicationInputs
