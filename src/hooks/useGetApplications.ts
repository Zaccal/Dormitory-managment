import supabase from "@/utils/supabase"
import { useQuery } from "@tanstack/react-query"

const useGetApplications = () => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const { data: requests, error } = await supabase.from("requests").select("*")
      if (error) throw error
      return requests
    },
    select(data) {
      return data
    },
    initialData: [],
  })
}

export default useGetApplications
