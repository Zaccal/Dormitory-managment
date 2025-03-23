import { Button } from "@/components/ui/button"
import useGetApplications from "@/hooks/useGetApplications"
import Error from "@/pages/Error"
import Loading from "@/pages/Loading"
import { Database } from "@/types/supabase.types"
import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import { ArrowUpDown } from "lucide-react"
import UserView from "../UserView/UserView"
import ApplicationsDataTable from "./Applications-data-table"

const columns: ColumnDef<Database["public"]["Tables"]["requests"]["Row"]>[] = [
  {
    accessorKey: "first_name",
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          variant={"ghost"}
        >
          Студент
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <UserView data={row.original} />,
    enableSorting: true,
    enableGlobalFilter: true,
  },
  { accessorKey: "phone", header: "Телефон" },
  { accessorKey: "phone_mother", header: "Телефон матери" },
  { accessorKey: "phone_father", header: "Телефон отца" },
  { accessorKey: "address", header: "Адрес" },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Дата подачи
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => dayjs(row.original.created_at).format("DD-MM-YYYY, HH:MM"),
  },
]

const ApplicationsTableFullFormat = () => {
  const { data, isError, isLoading, error } = useGetApplications()

  if (isError) return <Error title={error.message} />

  return <>{!isLoading ? <ApplicationsDataTable data={data} columns={columns} /> : <Loading />}</>
}

export default ApplicationsTableFullFormat
