import StudentsTable from "@/components/shared/StudentsTable/StudentsTable"
import useProfilesRow from "@/hooks/useProfilesRow"
import Error from "./Error"
import Loading from "./Loading"

const Students = () => {
  const { data: profiles, isLoading, isError, error } = useProfilesRow()

  if (isError) return <Error title={error.message} />

  return (
    <div className="container mt-5">
      <h1 className="font-bold mb-5 text-xl">Студенты общежития</h1>
      {!isLoading && profiles ? <StudentsTable data={profiles!} /> : <Loading />}
    </div>
  )
}

export default Students
