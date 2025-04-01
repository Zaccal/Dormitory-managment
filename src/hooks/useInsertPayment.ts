import { Database } from "@/types/supabase.types";
import supabase from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";

const useInsertPayment = async () => {
  return useMutation({
    mutationFn: async (
      data: Database["public"]["Tables"]["payments"]["Insert"],
    ) => {
      const { data: response, error } = await supabase
        .from("payments")
        .insert(data);

      if (error) throw error;

      return response;
    },
  });
};

export default useInsertPayment;
