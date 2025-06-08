import supabase from '@/lib/supabase'

export const getProfile = async (userId: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

    if (error) throw error
    return data
}
