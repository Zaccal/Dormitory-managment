import ChangeAvatarUser from "@/components/shared/ChangeAvatarUser"
import ValueViewSettings from "@/components/shared/ValueViewSettings"
import useProfile from "@/hooks/useProfile"
import { EnumPostConvertor, EnumStatusConvertor } from "@/utils/EnumStatusConvertor"

const Profile = () => {
  const { data: profile, isLoading, isError: isProfileError } = useProfile()

  return (
    <div className="mt-8 container">
      <div className="flex justify-center">
        <div className="flex flex-col gap-12">
          {!isLoading && <ChangeAvatarUser classNameAvatar="w-20 h-20 text-2xl" data={profile!} />}

          <div className="grid grid-cols-2 items-center gap-8">
            <ValueViewSettings isError={isProfileError} label="Имя" value={profile?.first_name} />
            <ValueViewSettings
              isError={isProfileError}
              label="Фамилия"
              value={profile?.last_name}
            />
            <ValueViewSettings
              isError={isProfileError}
              label="Отвество"
              value={profile?.patronymic || "Отсутвует"}
            />
            <ValueViewSettings isError={isProfileError} label="Почта" value={profile?.email} />
            <ValueViewSettings isError={isProfileError} label="Телефон" value={profile?.phone} />
            <ValueViewSettings
              label="Телефон матери"
              isError={isProfileError}
              value={profile?.mother_phone || "Отсутвует"}
            />
            <ValueViewSettings
              isError={isProfileError}
              label="Телефон отца"
              value={profile?.father_phone || "Отсутвует"}
            />
            <ValueViewSettings
              isError={isProfileError}
              label="Адрес дома"
              value={profile?.home_address || "Отсутвует"}
            />
            <ValueViewSettings
              isError={isProfileError}
              label="Статус"
              value={EnumStatusConvertor(profile?.status)}
            />
            <ValueViewSettings
              isError={isProfileError}
              label="Должность"
              value={EnumPostConvertor(profile?.role)}
            />
            <ValueViewSettings
              isError={isProfileError}
              label="Номер комнаты"
              value={String(profile?.room_number)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
