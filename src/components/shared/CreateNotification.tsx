import { Info, OctagonAlert, TriangleAlert } from 'lucide-react'
import { Button } from '../ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../ui/sheet'
import { Textarea } from '../ui/textarea'
import useInsertNotification from '@/hooks/useInsertNotification'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Database } from '@/types/supabase.types'
import { useState } from 'react'
import Loader from './Loader'
import useProfile from '@/hooks/useProfile'

interface INotificationForm {
    type: Database['public']['Enums']['type_notification']
    message: string
}

const CreateNotification = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { data: profile, isLoading, isError: isProfileError } = useProfile()
    const { mutateAsync, isPending } = useInsertNotification()
    const {
        register,
        control,
        formState: { errors },
        handleSubmit,
    } = useForm<INotificationForm>()

    const submitNotification: SubmitHandler<INotificationForm> = async (
        data,
    ) => {
        const now = new Date()
        if (profile && !isProfileError && !isLoading) {
            await mutateAsync({
                expired_at: new Date(
                    now.getTime() + 24 * 60 * 60 * 1000,
                ).toISOString(),
                message: data.message,
                type: data.type,
                user_id: profile.id,
            })

            setIsOpen(false)
        }
    }
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
                <Button className="mb-12">Отправить уведамление</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Создание уведомления</SheetTitle>
                    <SheetDescription>
                        Заплоните форму для отправки уведомления
                    </SheetDescription>
                </SheetHeader>
                <form
                    onSubmit={handleSubmit(submitNotification)}
                    className="mt-6 flex flex-col gap-4"
                >
                    {errors.type?.message && (
                        <label
                            className="text-destructive text-sm -mb-3"
                            htmlFor="type"
                        >
                            {errors.type?.message}
                        </label>
                    )}
                    <Controller
                        rules={{
                            required: {
                                value: true,
                                message: 'Выберите тип собщения',
                            },
                        }}
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                                disabled={isPending}
                            >
                                <SelectTrigger id="type">
                                    <SelectValue placeholder="Выберите тип собщения" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Important">
                                        <div className="flex items-center gap-2">
                                            <OctagonAlert size={18} />
                                            <span>Важное собщение</span>
                                        </div>{' '}
                                    </SelectItem>
                                    <SelectItem value="Warning">
                                        <div className="flex items-center gap-2">
                                            <TriangleAlert size={18} />
                                            <span>Предупреждение</span>
                                        </div>{' '}
                                    </SelectItem>
                                    <SelectItem value="info">
                                        <div className="flex items-center gap-2">
                                            <Info size={18} />
                                            <span>Важная информация</span>
                                        </div>{' '}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.type?.message && (
                        <label
                            className="text-destructive text-sm -mb-3"
                            htmlFor="type"
                        >
                            {errors.message?.message}
                        </label>
                    )}
                    <Textarea
                        disabled={isPending}
                        {...register('message', {
                            required: {
                                message: 'Введите собщение',
                                value: true,
                            },
                        })}
                        placeholder="Напишите собщение"
                    />
                    <Button type="submit" disabled={isPending}>
                        {isPending ? (
                            <Loader className="w-6 h-6 border-2" />
                        ) : (
                            'Отправить'
                        )}
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    )
}

export default CreateNotification
