import Error from '@/pages/Error'
import Home from '@/pages/Dashboard'
import Layout from '@/pages/Layout'
import Notifications from '@/pages/Notifications'
import Payment from '@/pages/Payment'
import Profile from '@/pages/Settings/Profile'
import Settings from '@/pages/Settings/Settings'
import { RouteProps } from 'react-router'
import { Dashboard, Students, Applications } from '@/pages/index'

const PrivateRoute: RouteProps[] = [
    {
        path: 'dashboard',
        element: <Dashboard />,
    },
    {
        path: 'dashboard/students',
        element: <Students />,
    },
    {
        path: 'dashboard/rooms',
        element: <></>,
    },
    {
        path: 'dashboard/applications',
        element: <Applications />,
    },
]

export default PrivateRoute
