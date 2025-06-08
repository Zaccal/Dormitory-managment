import { Dispatch as DispatchReact, SetStateAction } from 'react'

export type Dispatch<T> = DispatchReact<SetStateAction<T>>
