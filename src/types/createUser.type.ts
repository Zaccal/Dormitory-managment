export interface IUserCreate {
  email: string
  password: string
  token: string
  first_name: string
  last_name: string
  home_address: string
  room_number: number
  phone: string
  father_phone: string
  mother_phone: string
  patronymic: string | undefined
}
