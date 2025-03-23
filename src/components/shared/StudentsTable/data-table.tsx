import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
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
import DialogUserEditing from "../DialogUserEditing/DialogUserEditing"

type TypeProfiles = Database["public"]["Tables"]["profiles"]["Row"]

// TODO: Create a component data-table for create table and post it to application-table-full-format and studetnsTable

const DataTable = ({
  columns,
  data,
}: {
  columns: ColumnDef<TypeProfiles>[]
  data: TypeProfiles[]
}) => {
  const [globalFilter, setGlobalFilter] = useState("")
  const [sorting, setSorting] = useState<SortingState>([])
  const { width } = useWindowSize()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { globalFilter, sorting },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <div className="space-y-4">
      <Input
        value={globalFilter}
        onChange={e => setGlobalFilter(e.target.value)}
        placeholder="Поиск по Ф.И.О..."
        className="mb-4"
      />
      <div
        style={{
          width: width < 512 ? `${width - 26}px` : "auto",
        }}
      >
        <Table className="min-w-[1324px] border border-border">
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
              <DialogUserEditing key={row.id} data={row.original}>
                <TableRow className="cursor-pointer" key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell className="border-border border" key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              </DialogUserEditing>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default DataTable
