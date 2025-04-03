import StudentPayment from "@/components/shared/StudentPayment";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useInsertPayment from "@/hooks/useInsertPayment";
import { Database } from "@/types/supabase.types";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

export interface IPaymentForm {
  purpose: Database["public"]["Enums"]["payment_purpose"];
  reasone: string;
  studentId: string | null;
  amount: string;
  paymentMethod: Database["public"]["Enums"]["payment_method"];
}

const Payment = () => {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IPaymentForm>();
  const purpose = watch("purpose");
  const { mutateAsync, isPending } = useInsertPayment();

  const handler: SubmitHandler<IPaymentForm> = async ({
    amount,
    purpose,
    reasone,
    studentId,
    paymentMethod,
  }) => {
    await mutateAsync({
      amount,
      purpose,
      student_profile_id: studentId,
      reasone: reasone || "Оплата студента",
      payment_method: paymentMethod,
    });
    reset();
  };

  return (
    <div className="mt-8 container">
      <form
        onSubmit={handleSubmit(handler)}
        className="border flex flex-col gap-4 border-border rounded-md px-7 py-8 max-w-2xl mx-auto mt-16"
      >
        <h1 className="text-2xl text-center mb-3">Оплата</h1>
        <InputWithLabel
          placeholder="10,000 ₸"
          htmlFor="amount"
          disabled={isPending}
          label={
            errors.amount?.message ? errors.amount.message : "Стоимость в тенге"
          }
          {...register("amount", {
            required: {
              value: true,
              message: "Введите сумму",
            },
          })}
        />

        <div className="">
          <Label htmlFor="paymentMethod">Способ оплаты:</Label>
          <Controller
            name="paymentMethod"
            rules={{
              required: {
                value: true,
                message: "Выберите способ оплаты",
              },
            }}
            control={control}
            render={({ field }) => {
              return (
                <Select
                  disabled={isPending}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="purpuse">
                    <SelectValue placeholder="Способ оплаты" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Выберите цель</SelectLabel>
                      <SelectItem value="CASH">Наличкой</SelectItem>
                      <SelectItem value="KASPI">Kaspi оплата</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            }}
          />{" "}
        </div>

        <div className="">
          <Label htmlFor="purpuse">Цель:</Label>
          <Controller
            name="purpose"
            rules={{
              required: {
                value: true,
                message: "Выберите цель оплаты",
              },
            }}
            control={control}
            render={({ field }) => {
              return (
                <Select
                  disabled={isPending}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger id="purpuse">
                    <SelectValue placeholder="Цель оплаты" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Выберите цель</SelectLabel>
                      <SelectItem value="student_payment">
                        Опалата студента
                      </SelectItem>
                      <SelectItem value="dormitory_expenses">
                        Расходы на общежитие
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            }}
          />{" "}
        </div>

        {purpose !== undefined ? (
          purpose === "dormitory_expenses" ? (
            <Textarea
              {...register("reasone", {
                required: {
                  value: true,
                  message: "Введите цель трать",
                },
              })}
              disabled={isPending}
              placeholder="Опишите цель траты"
            />
          ) : (
            <StudentPayment
              isPending={isPending}
              errorMessage={errors.studentId?.message}
              purpose={purpose}
              control={control}
            />
          )
        ) : undefined}

        <Button disabled={isPending} type="submit" className="w-full mt-8">
          Внести оплату
        </Button>
      </form>
    </div>
  );
};

export default Payment;
