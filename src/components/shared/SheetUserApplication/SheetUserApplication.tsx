import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { Database } from "@/types/supabase.types"
import { getTextMessage } from "@/utils/getTextMessage"
import { sendWhatsappMessage } from "@/utils/sendWhatsappMessage"
import supabase from "@/utils/supabase"
import { ReactElement, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import Loader from "../Loader"
import ComfirmDelete from "./ComfirmDelete"
import SheetUserApplicationInputs, { ISheetForm } from "./SheetUserApplicationInputs"

interface ISheetUserApplication {
  children: ReactElement
  data: Database["public"]["Tables"]["requests"]["Row"]
}

const SheetUserApplication = ({ children, data }: ISheetUserApplication) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISheetForm>()
  const {
    signUpMutation: { isPending, isError },
    singUp,
  } = useAuth()

  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  const submitHandler: SubmitHandler<ISheetForm> = async data => {
    const password = Math.random().toString(36).slice(-8)
    const accessToken = (await supabase.auth.getSession()).data.session?.access_token

    if (accessToken) {
      await singUp({
        email: data.email,
        password: password,
        token: accessToken,
        first_name: data.first_name,
        last_name: data.last_name,
        home_address: data.address,
        room_number: data.room_number,
        phone: data.phone,
        father_phone: data.phone_father,
        mother_phone: data.phone_mother,
        patronymic: data.patronymic || undefined,
      })

      if (!isError) {
        setIsOpen(false)

        toast({
          title: "Пользователь успешно создан",
          variant: "success",
        })

        sendWhatsappMessage(
          data.phone,
          getTextMessage({ login: data.email, password, url: import.meta.env.VITE_SITE_URL })
        )
      }
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="">
        <SheetHeader>
          <SheetTitle>Заявление на проживание в общежитии</SheetTitle>
          <SheetDescription>
            Просмотрите и обработайте заявку на проживание в общежитии.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(submitHandler)} className="grid gap-4 py-4">
          <SheetUserApplicationInputs
            isPending={isPending}
            errors={errors}
            register={register}
            data={data}
          />

          <div className="flex items-center gap-5 mt-8 justify-between">
            <Button
              disabled={isPending}
              type="submit"
              className="w-full bg-green-500 hover:bg-green-400 font-bold"
            >
              {isPending ? <Loader className="w-5 h-5 border-2" /> : "Принять"}
            </Button>
            <ComfirmDelete isPending={isPending} />
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default SheetUserApplication
