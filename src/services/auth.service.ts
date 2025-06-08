import supabase from '@/lib/supabase'
import { CreateUserData, RequestRegister } from '@/types/auth.types'
import { LoginForm as LoginData } from '@/types/forms.types'
import { Database } from '@/types/supabase.types'

export const login = async (data: LoginData) => {
    const { email, password } = data
    const { data: response, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error) throw error
    return response
}

export const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
}

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
}

export const getUser = async () => {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return data.user
}

export const createUserRequest = async (
    data: CreateUserData,
    token: string
) => {
    const res = await fetch('/api/create-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    })

    if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Ошибка запроса')
    }

    return res.json()
}

export const requestRegister = async (value: RequestRegister) => {
    const { data: foundProfile, error: foundProfileError } = await supabase
        .from('profiles')
        .select('phone,email')
        .or(`email.eq.${value.email}, phone.eq.${value.phone}`)

    const { data: foundRequests, error: foundRequestsError } = await supabase
        .from('requests')
        .select('phone,email')
        .or(`email.eq.${value.email}, phone.eq.${value.phone}`)

    if (foundProfileError) throw foundProfileError
    if (foundRequestsError) throw foundRequestsError

    if (foundProfile.length || foundRequests.length)
        throw new Error(
            'Этот пользователь с таким телефоном или почтой уже существует'
        )

    const { error } = await supabase.from('requests').insert(value)

    if (error) throw error
}
