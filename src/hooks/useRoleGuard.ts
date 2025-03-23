import { Database } from "@/types/supabase.types"
import useProfile from "./useProfile"

type TypeRole = Database["public"]["Enums"]["role"]

const useRoleGuard = (role: TypeRole | TypeRole[]) => {
  const { data, isLoading, isError } = useProfile()

  if (!isLoading && data) {
    if (role === data.role || role.includes(data.role!))
      return {
        access: true,
        isError,
        isLoading,
      }
    else
      return {
        access: false,
        isError,
        isLoading,
      }
  } else {
    return {
      access: false,
      isError,
      isLoading,
    }
  }
}

export default useRoleGuard
