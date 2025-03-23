import UserView from "@/components/shared/UserView/UserView"
import { Badge } from "@/components/ui/badge"
import { Database } from "@/types/supabase.types"
import { EnumStatusConvertor } from "@/utils/EnumStatusConvertor"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import { ArrowUpDown } from "lucide-react"
import { Button } from "../../ui/button"
import DataTable from "./data-table"

const columns: ColumnDef<Database["public"]["Tables"]["profiles"]["Row"]>[] = [
  {
    accessorKey: "first_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Студент
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <UserView data={row.original} />,
    enableSorting: true,
    enableColumnFilter: true,
  },
  { accessorKey: "phone", header: "Номер телефона" },
  { accessorKey: "father_phone", header: "Номер телефона отца" },
  { accessorKey: "mother_phone", header: "Номер телефона матери" },
  { accessorKey: "home_address", header: "Адрес дома" },
  {
    accessorKey: "status",
    header: "Статус",
    cell: ({ row }) => EnumStatusConvertor(row.original.status),
  },
  {
    accessorKey: "is_paid",
    header: "Оплата в этом месяце",
    cell: ({ row }) => (
      <div className="w-full h-full flex items-center justify-center">
        <Badge variant={row.original.is_paid ? "success" : "destructive"}>
          {row.original.is_paid ? "оплачено" : "не оплачено"}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Дата регистрации
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => dayjs(row.original.created_at).format("DD.MM.YYYY, hh:mm"),
    enableSorting: true,
  },
]

const StudentsTable = ({ data }: { data: Database["public"]["Tables"]["profiles"]["Row"][] }) => {
  return <DataTable columns={columns} data={data} />
}

export default StudentsTable
