import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"

interface IComfirmDelete {
  isPending: boolean
}

const ComfirmDelete = ({ isPending }: IComfirmDelete) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(prev => !prev)}>
      <DialogTrigger asChild>
        <Button
          disabled={isPending}
          className="w-full hover:bg-destructive hover:text-white"
          variant={"outline"}
        >
          Отклонить
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Подтверждение удаления заявки</DialogTitle>
        <DialogDescription>
          Вы уверены, что хотите удалить заявку на поселение в общежитии? Это действие нельзя
          отменить.
        </DialogDescription>
        <div className="flex items-center justify-between gap-5">
          <Button className="w-full" variant={"destructive"}>
            Отклонить
          </Button>
          <Button onClick={() => setIsOpen(false)} className="w-full" variant={"outline"}>
            Отмена
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ComfirmDelete
