import supabase from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

function useGetCountStudentPaymentMonth() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return useQuery({
    queryKey: ["count-student-payment-month"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("payments")
        .select("*", { count: "exact", head: true })
        .eq("purpose", "student_payment")
        .gte("created_at", startOfMonth.toISOString())
        .lte("created_at", startOfNextMonth.toISOString());

      if (error) throw error;

      return count;
    },
  });
}

export default useGetCountStudentPaymentMonth;
