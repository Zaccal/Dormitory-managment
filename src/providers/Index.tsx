import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/hooks/ui/theme-provider'
import { ReactNode } from 'react'
import { BrowserRouter } from 'react-router'
import QueryProviderClient from './queryProviderClient'
import { TooltipProvider } from '@/components/ui/tooltip'

interface IGlobalProvider {
    children: ReactNode
}

const GlobalProvider = ({ children }: IGlobalProvider) => {
    const sidebarState = JSON.parse(
        localStorage.getItem('sidebar:state') || 'true'
    )

    return (
        <QueryProviderClient>
            <BrowserRouter>
                <ThemeProvider defaultTheme="light">
                    <TooltipProvider>
                        <SidebarProvider defaultOpen={sidebarState}>
                            {children}
                        </SidebarProvider>
                    </TooltipProvider>
                </ThemeProvider>
            </BrowserRouter>
        </QueryProviderClient>
    )
}

export default GlobalProvider
