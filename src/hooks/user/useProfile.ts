import { useQuery } from '@tanstack/react-query'
import { useGetUser } from '../auth/useAuth'
import { getProfile } from '@/services/user.service'
import { PostgrestError } from '@supabase/supabase-js'
import { signOut } from '@/services/auth.service'

const useProfile = () => {
    const { data: user } = useGetUser()

    return useQuery({
        queryKey: ['user-profile'],
        queryFn: async () => {
            try {
                return await getProfile(user!.id)
            } catch (error) {
                if (error instanceof PostgrestError) {
                    if (error.message.includes('JWT expired')) {
                        await signOut()
                    }

                    throw new Error(`Error fetching profile: ${error.message}`)
                }

                throw new Error(`Unexpected error fetching profile: ${error}`)
            }
        },

        enabled: !!user?.id,
    })
}

export default useProfile
