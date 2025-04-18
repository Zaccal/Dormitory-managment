import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'
import { TypeDispatch } from '@/types/dispath.type'

interface IDatePicker {
  date: Date
  setDate: TypeDispatch<Date | undefined>
}

export function DatePicker({ date, setDate }: IDatePicker) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
