import useProfile from '@/hooks/user/useProfile'
import { Role } from '@/types/enums.types'

const useRoleGuard = (role: Role | Role[]) => {
    const { data, isLoading, isError } = useProfile()

    if (!isLoading && data) {
        if (role === data.role || role.includes(data.role!))
            return {
                access: true,
                isError,
                isLoading,
            }
        else
            return {
                access: false,
                isError,
                isLoading,
            }
    } else {
        return {
            access: false,
            isError,
            isLoading,
        }
    }
}

export default useRoleGuard
