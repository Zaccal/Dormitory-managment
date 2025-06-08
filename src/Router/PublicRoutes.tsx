import Authorization from '@/pages/Authorization'
import { RouteProps } from 'react-router'

const PublicRoutes: RouteProps[] = [
    {
        path: '/',
        element: <Authorization />,
    },
]

export default PublicRoutes
