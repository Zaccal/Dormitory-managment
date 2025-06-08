import { Route, Routes } from 'react-router'
import { Toaster } from './components/ui/toaster'
import {
    GuestOnly,
    PublicRoutes,
    RequireAuth,
    PrivateRoute,
} from './Router/index'
import Layout from './pages/Layout'
import { Error, NotFound } from './pages'

function App() {
    return (
        <>
            <Routes>
                <Route element={<GuestOnly />}>
                    {PublicRoutes.map((routeProps) => (
                        <Route key={routeProps.path} {...routeProps} />
                    ))}
                </Route>

                <Route
                    element={
                        <RequireAuth>
                            <Layout />
                        </RequireAuth>
                    }
                >
                    {PrivateRoute.map((routeProps) => (
                        <Route key={routeProps.path} {...routeProps} />
                    ))}
                </Route>
                <Route path="*" element={<NotFound />} />
                <Route path="/error" element={<Error />} />
            </Routes>
            <Toaster />
        </>
    )
}

export default App
