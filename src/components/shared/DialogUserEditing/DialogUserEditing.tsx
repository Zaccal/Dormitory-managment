import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import useUpdateUser, { IFormUpdateUser } from "@/hooks/useUpdateUser"
import useWindowSize from "@/hooks/useWindowSize"
import { Database } from "@/types/supabase.types"
import { ReactNode, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import ChangeAvatarUser from "../ChangeAvatarUser"
import Loader from "../Loader"
import DialogUserEditingInputs from "./DialogUserEditingInputs"
import DialogUserEditingSelects from "./DialogUserEditingSelects"

interface IDialogUserEditing {
  children: ReactNode
  data: Database["public"]["Tables"]["profiles"]["Row"]
}

const DialogUserEditing = ({ children, data }: IDialogUserEditing) => {
  const [open, setOpen] = useState(false)
  const { mutateAsync, isPending } = useUpdateUser()
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IFormUpdateUser>({
    defaultValues: {
      role: data.role || undefined,
      status: data.status || undefined,
    },
  })
  const { height: windowsHeight } = useWindowSize()

  const onSubmit: SubmitHandler<IFormUpdateUser> = async formData => {
    if (data.user_id) {
      await mutateAsync({
        data: formData,
        id: data.user_id,
      })

      setOpen(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="dark:border-primary ">
        <DialogTitle>
          <ChangeAvatarUser data={data} />
        </DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div
            style={{
              maxHeight: windowsHeight - 435 + "px",
            }}
            className="items-end grid gap-x-8 gap-y-4 grid-cols-1 sm1.5:grid-cols-2 max-h overflow-y-auto"
          >
            <DialogUserEditingInputs data={data} errors={errors} register={register} />

            <DialogUserEditingSelects control={control} />
          </div>

          <div className="sm1.5:col-span-2 grid grid-cols-1 sm1.5:grid-cols-2 gap-4 mt-8">
            <Button disabled={isPending} type="submit" className=" bg-green-500 hover:bg-green-400">
              {!isPending ? "Сохранит" : <Loader className="w-5 h-5 border-2" />}
            </Button>
            <Button
              disabled={isPending}
              onClick={() => setOpen(false)}
              className="bg-destructive hover:bg-destructive/75"
            >
              Отмена
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogUserEditing
