import { Role, StatusOfStudent } from '@/types/enums.types'

export function EnumRoleConverter(role: Role | null) {
    switch (role) {
        case 'administrator':
            return 'Администратор'
        case 'main_superintendent':
            return 'Главный камендат'
        case 'superintendent':
            return 'Староста'
        case 'student':
            return 'Студент'
        default:
            return 'Отсутвует'
    }
}

export function EnumStatusConverter(status: StatusOfStudent | null) {
    switch (status) {
        case 'IN_DORMITORY':
            return 'В общежитии'
        case 'IN_HOME':
            return 'Уехал домой'
        case 'IS_ILL':
            return 'Болет'
        default:
            return 'Отсутвует'
    }
}
