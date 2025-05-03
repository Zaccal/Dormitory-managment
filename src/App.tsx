import Loader from './components/shared/Loader'
import { Toaster } from './components/ui/toaster'
import { useAuth } from './hooks/useAuth'
import useProfile from './hooks/useProfile'
import Error from './pages/Error'
import AuthedRoute from './Router/AuthedRoute'
import UnauthedRoute from './Router/UnauthedRoute'

function App() {
    const {
        error: errorProfile,
        isError: isErrorProfile,
        isLoading: isLoadingProfile,
    } = useProfile()
    const { user, isError, error, isLoading } = useAuth()

    if (isLoading || isLoadingProfile)
        return (
            <div className="flex items-center justify-center h-screen w-full">
                <div className="text-center">
                    <Loader />
                    <p className="font-bold">Загрузка...</p>
                </div>
            </div>
        )

    if (isError || isErrorProfile) {
        return (
            <Error
                className="mt-16"
                title={error?.message || errorProfile?.message}
            />
        )
    }

    return (
        <>
            {user ? <AuthedRoute /> : <UnauthedRoute />}
            <Toaster />
        </>
    )
}

export default App
