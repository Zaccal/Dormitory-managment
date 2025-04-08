import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Loader from "./Loader";

interface IConfirmModal {
  title?: string;
  description?: string;
  onComirm?: () => void;
  children: ReactNode;
  isLoading: boolean;
}

const ConfirmModal = ({
  title = "Вы уверены?",
  onComirm,
  description = "Вы уверены, что хотите удалить заявку на поселение в общежитии? Это действие нельзя отменить.",
  children,
  isLoading,
}: IConfirmModal) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setIsOpen(true)}>{children}</div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <div className="mt-4 flex items-center gap-4">
          <Button
            disabled={isLoading}
            onClick={() => setIsOpen(false)}
            className="w-full"
            variant={"outline"}
          >
            Отмена
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => {
              if (onComirm) onComirm();
            }}
            className="w-full"
            variant={"destructive"}
          >
            {isLoading ? <Loader className="w-5 h-5 border-2" /> : "Удалить"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
