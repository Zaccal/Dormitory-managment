import { TypeEnumRole, TypeEnumStatus } from "@/types/Enums"

export function EnumPostConvertor(enumPost: TypeEnumRole | null) {
  switch (enumPost) {
    case "administrator":
      return "Администратор"
    case "main_superintendent":
      return "Главный камендат"
    case "superintendent":
      return "Староста"
    case "student":
      return "Студент"
    default:
      return "Отсутвует"
  }
}

export function EnumStatusConvertor(enumStatus: TypeEnumStatus | null) {
  switch (enumStatus) {
    case "IN_DORMITORY":
      return "В общежитии"
    case "IN_HOME":
      return "Уехал домой"
    case "IS_ILL":
      return "Болет"
    default:
      return "Отсутвует"
  }
}
