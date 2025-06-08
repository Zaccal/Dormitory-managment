import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from '../ui/use-toast'
import {
    getSession,
    getUser,
    login,
    requestRegister,
    signOut,
} from '@/services/auth.service'
import { queryClient } from '@/lib/queryClient'

export function useLogin() {
    return useMutation({
        mutationKey: ['login'],
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['session'],
            })
        },
    })
}

export function useLogout() {
    return useMutation({
        mutationKey: ['logout'],
        mutationFn: signOut,
        onError: (error) => {
            toast({
                title: 'Ошибка выхода',
                description: error.message || 'Не удалось выйти из системы',
                variant: 'destructive',
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['session'],
            })
        },
    })
}

export function useSession() {
    return useQuery({
        queryKey: ['session'],
        queryFn: getSession,
        staleTime: 5 * 60 * 1000, // 5 minutes,
    })
}

export function useGetUser() {
    return useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}

export function useRequestRegister() {
    return useMutation({
        mutationKey: ['request-register'],
        mutationFn: requestRegister,
        onError: (error) => {
            toast({
                title: 'Что-то пошло не так, поробуите снова',
                description: error.message,
                variant: 'destructive',
            })
        },
        onSuccess: () => {
            toast({
                title: 'Заявка принята на рассмотрение.',
                description:
                    'Процесс обработки может занять несколько дней. Мы отправим вам логин, пароль и информацию о статусе заявки (принята или отклонена) на указанный телефон в WhatsApp.',
                variant: 'success',
            })
        },
    })
}
