import Loader from "@/components/shared/Loader"

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-24">
      <Loader />
      <p className="font-bold text-center mt-6">Загрузка таблицы...</p>
    </div>
  )
}

export default Loading
