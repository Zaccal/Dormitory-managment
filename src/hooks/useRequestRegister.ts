import { IRequestRegister } from "@/types/supabase-tables.types"
import supabase from "@/utils/supabase"
import { PostgrestError } from "@supabase/supabase-js"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { useToast } from "./use-toast"

type TypeReusltRequestMutation = UseMutationResult<unknown, PostgrestError, IRequestRegister>

const useRequestRegister = (): TypeReusltRequestMutation => {
  const { toast } = useToast()

  return useMutation({
    mutationKey: ["request-to-check-in"],
    mutationFn: async (value: IRequestRegister) => {
      const { data, error: isCheckError } = await supabase
        .from("profiles")
        .select("phone,email")
        .or(`email.eq.${value.email}, phone.eq.${value.phone}`)

      const { data: dataRequest, error: isCheckErrorRequest } = await supabase
        .from("requests")
        .select("phone,email")
        .or(`email.eq.${value.email}, phone.eq.${value.phone}`)

      if (isCheckError) throw new Error(isCheckError.message)
      if (isCheckErrorRequest) throw new Error(isCheckErrorRequest.message)

      if (data.length || dataRequest.length)
        throw new Error("Этот пользователь с таким телефоном или почтой уже существует")

      const { error } = await supabase.from("requests").insert(value)
      if (error) throw error
    },
    onError: error => {
      toast({
        title: "Упс...",
        description: `Ошибка: ${error.message}`,
        variant: "destructive",
      })
    },
  })
}

export default useRequestRegister
