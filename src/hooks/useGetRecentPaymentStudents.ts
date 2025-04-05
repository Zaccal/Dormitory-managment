import supabase from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

function useGetRecentPaymentStudents() {
  return useQuery({
    queryKey: ["recent-student-payment"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("*, profiles(id, first_name, last_name, email, photo_face)")
        .eq("purpose", "student_payment")
        .order("created_at", { ascending: true })
        .limit(5);

      if (error) throw error;

      return data;
    },
  });
}

export default useGetRecentPaymentStudents;
