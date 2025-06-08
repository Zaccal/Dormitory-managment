import { queryClient } from '@/lib/queryClient'
import { Role, StatusOfStudent } from '@/types/enums.types'
import supabase from '@/lib/supabase'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/ui/use-toast'

export interface IFormUpdateUser {
    firstName: string
    lastName: string
    patronymic: string
    motherPhone: string
    fatherPhone: string
    phone: string
    roomNumber: string
    role: Role
    status: StatusOfStudent
    address: string
}

interface IParamsMustate {
    data: IFormUpdateUser
    id: string
}

const useUpdateUser = () => {
    const { toast } = useToast()

    return useMutation({
        mutationFn: async ({ data, id }: IParamsMustate) => {
            const { data: response, error } = await supabase
                .from('profiles')
                .update({
                    first_name: data.firstName,
                    last_name: data.lastName,
                    patronymic: data.patronymic,
                    home_address: data.address,
                    phone: data.phone,
                    mother_phone: data.motherPhone,
                    father_phone: data.fatherPhone,
                    room_number: Number(data.roomNumber),
                    status: data.status,
                    role: data.role,
                })
                .eq('user_id', id)
                .select()

            if (error) throw error

            return response
        },
        retry: 3,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['profiles-row'],
            })

            toast({
                title: 'Профиль успешно обновлён! 🎉',
                variant: 'success',
            })
        },
        onError: (error) => {
            toast({
                title: '❌ Ошибка при обновлении профиля. Попробуйте ещё раз',
                description: `Ошипка: ${error.message}`,
                variant: 'destructive',
            })
        },
    })
}

export default useUpdateUser
