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
import { EnumPurpusePayment } from "@/types/Enums";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

export interface IPaymentForm {
  purpuse: EnumPurpusePayment;
  resone: string;
  studentId: string | null;
  amount: string;
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
  const purpuse = watch("purpuse");

  const handler: SubmitHandler<IPaymentForm> = (data) => {
    console.log(data);
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
          label={errors.amount ? errors.amount.message : "Стоимость в тенге"}
          {...register("amount", {
            required: {
              value: true,
              message: "Введите сумму",
            },
          })}
        />

        <div className="">
          <Label htmlFor="purpuse">Цель:</Label>
          <Controller
            name="purpuse"
            rules={{
              required: {
                value: true,
                message: "Выберите цель оплаты",
              },
            }}
            control={control}
            render={({ field }) => {
              return (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="purpuse">
                    <SelectValue placeholder="Цель оплаты" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Выберите цель</SelectLabel>
                      <SelectItem value="studentPayment">
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

        {purpuse !== undefined ? (
          purpuse === EnumPurpusePayment.DROMITORY_EXPENSES ? (
            <Textarea
              {...register("resone", {
                required: {
                  value: true,
                  message: "Введите цель трать",
                },
              })}
              placeholder="Опишите цель траты"
            />
          ) : (
            <StudentPayment
              errorMessage={errors.studentId?.message}
              purpuse={purpuse}
              control={control}
            />
          )
        ) : undefined}

        <Button type="submit" className="w-full mt-8">
          Внести оплату
        </Button>
      </form>
    </div>
  );
};

export default Payment;
