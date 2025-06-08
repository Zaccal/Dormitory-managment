import { cn } from '@/lib/utils'
import { Database } from '@/types/supabase.types'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface IChangeAvatarUser {
    data: Database['public']['Tables']['profiles']['Row']
    classNameAvatar?: string
}

const ChangeAvatarUser = ({ data, classNameAvatar }: IChangeAvatarUser) => {
    return (
        <>
            <div className="flex items-center gap-4">
                <Avatar className={cn('w-16 h-16 text-xl', classNameAvatar)}>
                    <AvatarFallback>
                        {data.first_name[0].toLocaleUpperCase() +
                            data.last_name[0].toLocaleUpperCase()}
                    </AvatarFallback>
                    <AvatarImage src={data.photo_face || ''} />
                </Avatar>
                <div className="flex items-center">
                    <Input type="file" accept="image/*" />
                    <Button className="ml-4" variant={'destructive'}>
                        Удалить фото
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ChangeAvatarUser
