import { useQuery } from '@tanstack/react-query'
import supabase from '../utils/supabase'
import { useAuth } from './useAuth'

const useProfile = () => {
  const { user, signOut } = useAuth()

  return useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user!.id)
        .single()

      if (error) {
        if (error.message === 'JWT expired') {
          signOut()
        } else throw error
      }
      return data
    },

    enabled: !!user?.id,
    retry: 2,
  })
}

export default useProfile
