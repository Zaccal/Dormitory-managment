import { Database } from "@/types/supabase.types";
import supabase from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";

const useInsertPayment = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (
      data: Database["public"]["Tables"]["payments"]["Insert"]
    ) => {
      const { data: response, error } = await supabase
        .from("payments")
        .insert(data);

      if (error) throw error;

      return response;
    },
    onError: (error) => {
      toast({
        title: "Упс.. что-то пошло не так!",
        description: error.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "Платеж успешно внесена в базуданых бухгалтерий",
        variant: "success",
      });
    },
  });
};

export default useInsertPayment;
