import useProfilesRow from "@/hooks/useProfilesRow";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import { Control, Controller } from "react-hook-form";
import { IPaymentForm } from "@/pages/Payment";
import { Database } from "@/types/supabase.types";

interface IStudentPayment {
  control: Control<IPaymentForm, any>;
  isPending: boolean;
  purpose: Database["public"]["Enums"]["payment_purpose"];
  errorMessage?: string;
}

const StudentPayment = ({
  control,
  purpose,
  errorMessage,
  isPending,
}: IStudentPayment) => {
  const { data, isLoading, isError, error } = useProfilesRow();

  if (isLoading) return <Skeleton className="w-full h-10 rounded-md" />;
  if (isError)
    return (
      <div className="px-4 py-2 text-white bg-destructive rounded-sm">
        <h2>Ошипка попробуйте {error.message}</h2>
      </div>
    );

  return (
    <Controller
      name="studentId"
      rules={{
        required: {
          value: purpose === "student_payment",
          message: "Выберите студента",
        },
      }}
      control={control}
      render={({ field }) => (
        <Select
          onValueChange={field.onChange}
          disabled={isLoading || isPending}
        >
          <SelectTrigger varaint={errorMessage ? "error" : "default"}>
            <SelectValue placeholder="Выбрите студента который оплачивает" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Студенты</SelectLabel>
              {data?.map((data) => (
                <SelectItem key={data.id} value={data.id}>
                  {data.first_name} {data.last_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default StudentPayment;
