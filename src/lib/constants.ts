import {
    BedSingle,
    BookUser,
    CircleDollarSign,
    Home,
    Receipt,
    Users,
} from 'lucide-react'

export const SIDEBAR_ITEMS = [
    {
        title: 'Главная',
        url: '/dashboard',
        icon: Home,
    },
    {
        title: 'Студенты',
        url: '/dashboard/students',
        icon: Users,
    },
    {
        title: 'Комнаты',
        url: '/dashboard/rooms',
        icon: BedSingle,
    },
    {
        title: 'Завяки',
        url: '/dashboard/applications',
        icon: BookUser,
    },
    {
        title: 'Оплата',
        url: '/dashboard/payments',
        icon: CircleDollarSign,
    },
    {
        title: 'Чеки',
        url: '/dashboard/bills',
        icon: Receipt,
    },
]
