import { Database } from '@/types/supabase.types'
import supabase from '@/utils/supabase'
import { useMutation } from '@tanstack/react-query'
import { useToast } from './use-toast'
import { queryClient } from '@/providers/QueryProviderClient'

type TypeInsertNotification =
  Database['public']['Tables']['notifications']['Insert']

function useInsertNotification() {
  const { toast } = useToast()
  return useMutation({
    mutationFn: async (data: TypeInsertNotification) => {
      const { data: response, error } = await supabase
        .from('notifications')
        .insert(data)

      if (error) throw error

      return response
    },
    onSuccess: () => {
      toast({
        title: 'Уведомление отправлено успешно!',
        variant: 'success',
      })

      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Упс что-то пошло не так!'

      toast({
        title: errorMessage,
        variant: 'destructive',
      })
    },
  })
}

export default useInsertNotification
