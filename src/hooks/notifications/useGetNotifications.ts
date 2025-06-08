import supabase from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

function useGetNotification() {
    return useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('notifications')
                .select('*')

            if (error) throw error

            return data
        },
    })
}

export default useGetNotification
