import { InputWithLabel } from "@/components/ui/input"
import { IFormUpdateUser } from "@/hooks/useUpdateUser"
import { Database } from "@/types/supabase.types"
import { FieldErrors, UseFormRegister } from "react-hook-form"

interface IDialogUserEditingInputs {
  register: UseFormRegister<IFormUpdateUser>
  errors: FieldErrors<IFormUpdateUser>
  data: Database["public"]["Tables"]["profiles"]["Row"]
}

const DialogUserEditingInputs = ({ register, errors, data }: IDialogUserEditingInputs) => {
  return (
    <>
      <InputWithLabel
        {...register("firstName", {
          required: {
            message: "Ведите имя",
            value: true,
          },
        })}
        htmlFor="first-name"
        variant={errors.firstName ? "error" : "defualt"}
        label={errors.firstName?.message ? errors.firstName.message : "Имя:"}
        defaultValue={data.first_name}
      />
      <InputWithLabel
        {...register("lastName", {
          required: {
            message: "Ведите фамильия",
            value: true,
          },
        })}
        htmlFor="last-name"
        label="Фамильия:"
        defaultValue={data.last_name}
      />
      <InputWithLabel
        htmlFor="patronymic"
        label="Отчество:"
        defaultValue={data.patronymic || ""}
        placeholder="Отсуствует"
        {...register("patronymic")}
      />
      <InputWithLabel htmlFor="phone" label="Телефон:" defaultValue={data.phone} />
      <InputWithLabel
        htmlFor="phone-mother"
        label="Телефон матери:"
        defaultValue={data.mother_phone || ""}
        placeholder="Отсуствует"
        {...register("phone", {
          required: {
            message: "Ведите телефон",
            value: true,
          },
        })}
      />
      <InputWithLabel
        htmlFor="phone-father"
        label="Телефон отца:"
        defaultValue={data.father_phone || ""}
        placeholder="Отсуствует"
        {...register("fatherPhone", {
          required: {
            message: "Ведите телефон отца",
            value: true,
          },
        })}
      />
      <InputWithLabel
        {...register("roomNumber", {
          required: {
            message: "Назначте комнату",
            value: true,
          },
        })}
        htmlFor="room"
        label="Комната:"
        type="number"
        defaultValue={data.room_number}
      />
      <InputWithLabel
        {...register("address", {
          required: {
            message: "Ведите адрес проживания",
            value: true,
          },
        })}
        htmlFor="room"
        label="Адрес:"
        defaultValue={data.home_address}
      />
    </>
  )
}

export default DialogUserEditingInputs
