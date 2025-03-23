import supabase from "@/utils/supabase"
import { useQuery } from "@tanstack/react-query"
import useProfile from "./useProfile"

const useProfilesRow = () => {
  const { data: profile } = useProfile()

  return useQuery({
    queryKey: ["profiles-row"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("user_id", profile!.user_id)
      if (error) throw error
      return data
    },
    enabled: !!profile?.user_id,
  })
}

export default useProfilesRow
