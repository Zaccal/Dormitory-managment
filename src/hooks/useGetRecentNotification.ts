import supabase from '@/utils/supabase'
import { useQuery } from '@tanstack/react-query'

function useGetRecentNotification() {
    return useQuery({
        queryKey: ['recent-notification'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('notifications')
                .select(
                    '*, profiles(id, first_name, last_name, email, photo_face)',
                )
                .order('created_at', { ascending: true })
                .limit(3)

            if (error) throw error

            return data
        },
    })
}

export default useGetRecentNotification
