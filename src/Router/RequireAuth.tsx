import Loader from '@/components/shared/Loader'
import { useSession } from '@/hooks/auth/useAuth'
import { Error } from '@/pages/index'
import { ReactNode } from 'react'
import { Navigate } from 'react-router'

const RequireAuth = ({ children }: { children?: ReactNode }) => {
    const { data, isLoading, error, isError } = useSession()

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error title={error.message} />
    }

    if (!data?.user) {
        return <Navigate to={'/'} replace />
    }

    return <>{children}</>
}

export default RequireAuth
