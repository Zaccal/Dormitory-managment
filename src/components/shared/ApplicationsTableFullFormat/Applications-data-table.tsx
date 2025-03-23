import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useWindowSize from "@/hooks/useWindowSize"
import { Database } from "@/types/supabase.types"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"
import SheetUserApplication from "../SheetUserApplication/SheetUserApplication"

interface IApplicationsDataTable {
  data: Database["public"]["Tables"]["requests"]["Row"][]
  columns: ColumnDef<Database["public"]["Tables"]["requests"]["Row"]>[]
}

const ApplicationsDataTable = ({ columns, data }: IApplicationsDataTable) => {
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])
  const { width } = useWindowSize()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { sorting, globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="space-y-4">
      <Input
        placeholder="Пойск по Ф.И.О..."
        value={globalFilter}
        onChange={e => setGlobalFilter(e.target.value)}
      />
      <div
        style={{
          width: width <= 498 ? width - 26 + "px" : "auto",
        }}
      >
        <Table className="min-w-[1280px] border border-border">
          <TableCaption>{data.length ? "Таблица заявок" : "Пока нету заявок"}</TableCaption>
          <TableHeader className="bg-secondary dark:bg-primary border-border">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow className="border-border" key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc"
                      ? " ▲"
                      : header.column.getIsSorted() === "desc"
                      ? " ▼"
                      : ""}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <SheetUserApplication data={row.original} key={row.id}>
                <TableRow className="cursor-pointer">
                  {row.getVisibleCells().map(cell => (
                    <TableCell className="border-border border" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              </SheetUserApplication>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ApplicationsDataTable
