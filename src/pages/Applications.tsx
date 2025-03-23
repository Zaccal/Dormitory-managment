import ApplicationsTableFullFormat from "@/components/shared/ApplicationsTableFullFormat/ApplicationsTableFullFormat"

const Applications = () => {
  return (
    <div className="container mt-5">
      <h1 className="font-bold mb-5 text-xl">Заявки на засиление</h1>
      <div className="">
        <ApplicationsTableFullFormat />
      </div>
    </div>
  )
}

export default Applications
