import { Database } from '@/types/supabase.types'
import {
    getIcon,
    getTitle,
    TypeNotification,
} from '@/utils/getSignNotification'
import { truncateTextByWords } from '@/utils/TruncateText'
import dayjs from 'dayjs'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { useMutation } from '@tanstack/react-query'
import supabase from '@/utils/supabase'
import { queryClient } from '@/providers/QueryProviderClient'
import ConfirmModal from './ConfirmModal'

interface INotificationCard {
    type: TypeNotification
    description: string
    createdAt: string
    role: Database['public']['Enums']['role'] | null | undefined
    id: string
}

const NotificationCard = ({
    type,
    description,
    createdAt,
    role,
    id,
}: INotificationCard) => {
    const { mutateAsync, isPending } = useMutation({
        mutationFn: async () => {
            const { data, error } = await supabase
                .from('notifications')
                .delete()
                .eq('id', id)

            if (error) throw error

            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['notifications'],
            })
        },
    })

    const handlerDeleteNotification = async () => {
        await mutateAsync()
    }

    return (
        <div className="w-full flex items-center gap-4 rounded-lg border-border border shadow-md px-4 py-4">
            {getIcon(type, 39)}
            <div className="flex flex-col justify-center w-full">
                <div className=" flex items-center justify-between w-full">
                    <h2 className="text-lg font-bold">{getTitle(type)}</h2>
                    <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">
                            {dayjs(createdAt).format('DD.MM.YYYY, HH:MM')}
                        </span>
                        {role === 'main_superintendent' ||
                        role == 'administrator' ? (
                            <ConfirmModal
                                isLoading={isPending}
                                onComirm={handlerDeleteNotification}
                            >
                                <Button
                                    disabled={isPending}
                                    className="text-destructive hover:text-destructive hover:bg-red-200"
                                    variant={'ghost'}
                                    size={'icon'}
                                >
                                    <Trash2 />
                                </Button>
                            </ConfirmModal>
                        ) : undefined}
                    </div>
                </div>

                <Tooltip>
                    <TooltipTrigger asChild className="text-left">
                        <p className="text-muted-foreground text-md">
                            {truncateTextByWords(description, 28)}
                        </p>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="text-muted-foreground text-md max-w-6xl">
                            {description}
                        </p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    )
}

export default NotificationCard
