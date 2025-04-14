import { Toaster } from './components/ui/toaster'
import { useAuth } from './hooks/useAuth'
import useProfile from './hooks/useProfile'
import Error from './pages/Error'
import AuthedRoute from './Router/AuthedRoute'
import UnauthedRoute from './Router/UnauthedRoute'

function App() {
    const {
        data,
        error: errorProfile,
        isError: isErrorProfile,
        isLoading: isLoadingProfile,
    } = useProfile()
    const { user, isError, error, isLoading } = useAuth()

    if (isLoading || isLoadingProfile) return null

    // if (isError || isErrorProfile) return <Error title={error?.message} />
    // TODO: Catch a error if it was not related with jwt exipred

    return (
        <>
            {user ? <AuthedRoute /> : <UnauthedRoute />}
            <Toaster />
        </>
    )
}

export default App
