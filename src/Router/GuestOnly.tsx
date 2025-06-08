import Loader from '@/components/shared/Loader'
import { useSession } from '@/hooks/auth/useAuth'
import { Error } from '@/pages/index'
import { Navigate, Outlet } from 'react-router'

const GuestOnly = () => {
    const { data: session, isLoading, isError, error } = useSession()

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error title={error.message} />
    }

    if (session?.user) {
        return <Navigate to={'/dashboard'} replace />
    }

    return (
        <>
            <Outlet />
        </>
    )
}

export default GuestOnly
