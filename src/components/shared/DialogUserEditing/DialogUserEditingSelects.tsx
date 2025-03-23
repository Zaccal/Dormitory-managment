import { IFormUpdateUser } from "@/hooks/useUpdateUser"
import { Database } from "@/types/supabase.types"
import { EnumPostConvertor, EnumStatusConvertor } from "@/utils/EnumStatusConvertor"
import { Control, Controller } from "react-hook-form"
import Select from "react-select"

interface IDialogUserEditingSelects {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<IFormUpdateUser, any>
}

interface IOptions<T> {
  option: T
  label: string
}

const roleOptions: IOptions<Database["public"]["Enums"]["role"]>[] = [
  { option: "student", label: "Студент" },
  { option: "administrator", label: "Администратор" },
  { option: "main_superintendent", label: "Главный камендант" },
  { option: "superintendent", label: "Камендант" },
]

const statusOptions: IOptions<Database["public"]["Enums"]["Status of student"]>[] = [
  { option: "IS_ILL", label: "Болет" },
  { option: "IN_COLLAGE", label: "В коледже" },
  { option: "IN_DORMITORY", label: "в общежитии" },
  { option: "IN_HOME", label: "Уехал домой" },
  { option: "OUTSIDE", label: "Ушел в город" },
]

const DialogUserEditingSelects = ({ control }: IDialogUserEditingSelects) => {
  return (
    <>
      <Controller
        name="role"
        control={control}
        render={({ field: { onChange, ref, value } }) => (
          <Select
            options={roleOptions}
            ref={ref}
            placeholder={EnumPostConvertor(value)}
            value={roleOptions.find(data => data.option === value)}
            onChange={selectedOption => onChange(selectedOption!.option)}
          />
        )}
      />

      <Controller
        control={control}
        name="status"
        render={({ field: { value, ref, onChange } }) => (
          <Select
            options={statusOptions}
            ref={ref}
            placeholder={EnumStatusConvertor(value)}
            value={statusOptions.find(data => data.option === value)}
            onChange={selectedOption => onChange(selectedOption!.option)}
          />
        )}
      />
    </>
  )
}

export default DialogUserEditingSelects
