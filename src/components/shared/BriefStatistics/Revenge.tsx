import { Badge } from "@/components/ui/badge"

const Revenge = () => {
  return (
    <>
      <div className="flex min-w-[300px] flex-col gap-2">
        <h3 className="font-semibold text-2xl">Соброно в этом месяце</h3>
        <div className="flex items-ed gap-4">
          <span className="font-bold text-2xl">₸100,000</span>
          <div className="flex items-center gap-2">
            <Badge className="dark:bg-secondary">
              67<span className="opacity-75">.09</span>%
            </Badge>
          </div>
        </div>
        <p>Необходимая цель: ₸300,000 </p>
      </div>
    </>
  )
}

export default Revenge
