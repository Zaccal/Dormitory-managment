import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import supabase from "../utils/supabase"
import { useAuth } from "./useAuth"

const useProfile = () => {
  const { user, signOut } = useAuth()
  const nav = useNavigate()

  return useQuery({
    queryKey: ["user-profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user!.id)
        .single()

      if (error) {
        throw error
      }
      return data
    },

    enabled: !!user?.id,
  })
}

export default useProfile
