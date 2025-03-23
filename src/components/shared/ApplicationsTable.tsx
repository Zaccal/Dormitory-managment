import useGetApplications from "@/hooks/useGetApplications"
import useWindowSize from "@/hooks/useWindowSize"
import dayjs from "dayjs"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import Container from "./Container"

interface IApplicationsTable {
  className?: string
}

const ApplicationsTable = ({ className }: IApplicationsTable) => {
  const { data, error, isError, isLoading } = useGetApplications()
  const { width } = useWindowSize()
  const tableContainerFixedWidth = width > 768 ? width - 120 : width - 50

  // TODO: Create realtime data

  if (isError)
    return (
      <div className="w-full py-10 flex items-center justify-center">
        <p className="text-center text-destructive">Ошипка загрузки таблицы: {error.message}</p>
      </div>
    )

  return (
    <>
      <Container className={className}>
        <h2 className="text-lg font-semibold">Недавние заявки на засиление</h2>
        <div
          style={{
            width: width > 1400 ? undefined : tableContainerFixedWidth,
          }}
        >
          <Table className="mt-6 border border-border dark:bg-primary rounded-lg min-w-[1300px]">
            <TableCaption>{data.length ? "Заявки на засиление" : "Пока нет заявок"}</TableCaption>
            <TableHeader className="bg-secondary dark:bg-destructive-foreground">
              <TableRow className="border-border">
                <TableHead>Имя</TableHead>
                <TableHead>Фамилия</TableHead>
                <TableHead>Отчество</TableHead>
                <TableHead>Почта</TableHead>
                <TableHead>Номер телефона</TableHead>
                <TableHead>Номер отца</TableHead>
                <TableHead>Номер матери</TableHead>
                <TableHead>Адрес</TableHead>
                <TableHead>Дата подачи</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!isLoading &&
                data.map(itemData => (
                  <TableRow className="border-border" key={itemData.id}>
                    <TableCell className="border border-border">{itemData.first_name}</TableCell>
                    <TableCell className="border border-border">{itemData.last_name}</TableCell>
                    <TableCell className="border border-border">
                      {itemData.patronymic || "Отсуствует"}
                    </TableCell>
                    <TableCell className="border border-border">{itemData.email}</TableCell>
                    <TableCell className="border border-border">{itemData.phone}</TableCell>
                    <TableCell className="border border-border">{itemData.phone_father}</TableCell>
                    <TableCell className="border border-border">{itemData.phone_mother}</TableCell>
                    <TableCell className="max-w-[276px] border border-border">
                      {itemData.address}
                    </TableCell>
                    <TableCell className="border border-border">
                      {dayjs(itemData.created_at).format("DD.MM.YYYY, HH:MM")}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </Container>
    </>
  )
}

export default ApplicationsTable
