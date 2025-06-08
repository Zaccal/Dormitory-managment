export interface RegisterForm {
    email: string
    address: string
    created_at?: string
    first_name: string
    id?: string
    last_name: string
    patronymic?: string | null
    phone: string
    phone_father: string
    phone_mother: string
}

export interface LoginForm {
    email: string
    password: string
}
