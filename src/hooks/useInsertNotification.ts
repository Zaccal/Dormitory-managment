import { Database } from "@/types/supabase.types";
import supabase from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";

type TypeInsertNotification =
  Database["public"]["Tables"]["notifications"]["Insert"];

function useInsertNotification() {
  return useMutation({
    mutationFn: async (data: TypeInsertNotification) => {
      const { data: response, error } = await supabase
        .from("notifications")
        .insert(data);

      if (error) throw error;

      return response;
    },
  });
}

export default useInsertNotification;
