import { Info, ShieldAlert, TriangleAlert } from "lucide-react"

export type TypeNotification = "Warning" | "Important" | "info"

export function getTitle(type: TypeNotification) {
  switch (type) {
    case "Warning":
      return "Предупреждение!"
    case "Important":
      return "Важно!"
    case "info":
      return "Внимание!"
  }
}

export function getIcon(type: TypeNotification, size: number = 27) {
  switch (type) {
    case "Warning":
      return (
        <div className="p-2 rounded-lg bg-yellow-200 dark:bg-yellow-300 w-fit">
          <TriangleAlert
            className="text-[#f2c82b] dark:text-yellow-600"
            size={size}
            strokeWidth={1.8}
          />
        </div>
      )
    case "Important":
      return (
        <div className="p-2 rounded-lg bg-red-200 w-fit">
          <ShieldAlert color="#f22b2b" size={size} strokeWidth={1.8} />
        </div>
      )
    case "info":
      return (
        <div className="p-2 rounded-lg bg-blue-200 w-fit">
          <Info color="#2b56f2" size={size} strokeWidth={1.8} />
        </div>
      )
  }
}
