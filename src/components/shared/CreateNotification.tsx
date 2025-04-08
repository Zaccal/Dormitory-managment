import { Info, OctagonAlert, TriangleAlert } from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Textarea } from "../ui/textarea";
import useInsertNotification from "@/hooks/useInsertNotification";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Database } from "@/types/supabase.types";

interface INotificationForm {
  type: Database["public"]["Enums"]["type_notification"];
  message: string;
  expire: Date;
}

const CreateNotification = () => {
  const { mutateAsync, isPending, isError, error } = useInsertNotification();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<INotificationForm>();

  const submitNotification: SubmitHandler<INotificationForm> = (data) => { };

  return (
    <Sheet>
      <SheetTrigger>
        <Button className="mb-12">Отправить уведамление</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Создание уведомления</SheetTitle>
          <SheetDescription>
            Заплоните форму для отправки уведомления
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(submitNotification)}
          className="mt-6 flex flex-col gap-4"
        >
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип собщения" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Important">
                    <div className="flex items-center gap-2">
                      <OctagonAlert size={18} />
                      <span>Важное собщение</span>
                    </div>{" "}
                  </SelectItem>
                  <SelectItem value="Warning">
                    <div className="flex items-center gap-2">
                      <TriangleAlert size={18} />
                      <span>Предупреждение</span>
                    </div>{" "}
                  </SelectItem>
                  <SelectItem value="info">
                    <div className="flex items-center gap-2">
                      <Info size={18} />
                      <span>Важная информация</span>
                    </div>{" "}
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Textarea placeholder="Напишите собщение" />
          <Button>Отправить</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateNotification;
