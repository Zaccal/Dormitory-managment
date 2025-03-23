import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface IUserViewData {
  email: string
  first_name: string
  last_name: string
  photo_face?: string | null
}

interface IUserView {
  data: IUserViewData
}

const UserView = ({ data }: IUserView) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={data.photo_face || ""} />
          <AvatarFallback>
            {data.first_name[0].toLocaleUpperCase() + data.last_name[0].toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold">{data.first_name + " " + data.last_name}</span>
          <span className="text-muted-foreground dark:text-muted">{data.email}</span>
        </div>
      </div>
    </>
  )
}

export default UserView
