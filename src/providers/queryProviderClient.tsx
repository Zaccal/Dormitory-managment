import { queryClient } from '@/lib/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

interface IQueryProviderClient {
    children: ReactNode | ReactNode[]
}

const QueryProviderClient = ({ children }: IQueryProviderClient) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryProviderClient
