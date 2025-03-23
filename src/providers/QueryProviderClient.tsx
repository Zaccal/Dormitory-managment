import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

interface IQueryProviderClient {
  children: ReactNode | ReactNode[]
}

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient()

const QueryProviderClient = ({ children }: IQueryProviderClient) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default QueryProviderClient
