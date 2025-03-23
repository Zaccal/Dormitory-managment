import { CircleDollarSign, CreditCard, Users } from "lucide-react"
import Container from "../Container"
import BriefStatisticsCard from "./BriefStatisticsCard"
import Revenge from "./Revenge"

const BriefStatistics = () => {
  return (
    <Container>
      <h2 className="text-2xl md:text-3xl text-muted-foreground font-bold mb-10">
        Отчет за этот месяц
      </h2>
      <div className="flex items-start flex-col xl:flex-row justify-between gap-12">
        <Revenge />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start w-full gap-5">
          <BriefStatisticsCard
            className="w-full"
            title="Оплачено за месяц"
            content="120/200"
            subtitle="72% оплочино студентами"
            icon={<Users size={14} className="text-muted-foreground" />}
          />
          <BriefStatisticsCard
            className="w-full"
            title="Должников"
            content="24"
            subtitle="2,3% должников"
            icon={<Users size={14} className="text-muted-foreground" />}
          />

          <BriefStatisticsCard
            className="w-full"
            title="Расходы"
            content="₸0.0"
            subtitle="₸0.0 потрачено в этом месяце"
            icon={<CircleDollarSign size={14} className="text-muted-foreground" />}
          />

          <BriefStatisticsCard
            className="w-full"
            title="Сумма задолжности"
            content="₸240,000.0"
            subtitle="Сумма за год"
            icon={<CreditCard size={14} className="text-muted-foreground" />}
          />
        </div>
      </div>
    </Container>
  )
}

export default BriefStatistics
