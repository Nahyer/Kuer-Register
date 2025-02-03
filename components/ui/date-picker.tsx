"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DatePickerProps {
  date?: Date
  setDate: (date: Date | undefined) => void
  className?: string
}

export function DatePicker({ date, setDate, className }: DatePickerProps) {
  const [month, setMonth] = React.useState<number>(() => {
    return date ? date.getMonth() : new Date().getMonth()
  })
  const [year, setYear] = React.useState<number>(() => {
    return date ? date.getFullYear() : new Date().getFullYear()
  })

  // Generate month options
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Generate year options (current year to 40 years back)
  const years = React.useMemo(() => {
    const currentYear = new Date().getFullYear()
    return Array.from({ length: 41 }, (_, i) => currentYear - i)
  }, [])

  const handleMonthChange = (newMonth: string) => {
    const monthIndex = months.indexOf(newMonth)
    setMonth(monthIndex)
    if (date) {
      const newDate = new Date(date)
      newDate.setMonth(monthIndex)
      if (newDate.getTime() !== date.getTime()) {
        setDate(newDate)
      }
    }
  }

  const handleYearChange = (newYear: string) => {
    const yearNumber = Number.parseInt(newYear, 10)
    setYear(yearNumber)
    if (date) {
      const newDate = new Date(date)
      newDate.setFullYear(yearNumber)
      if (newDate.getTime() !== date.getTime()) {
        setDate(newDate)
      }
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            month={new Date(year, month)}
            onMonthChange={(newDate) => {
              setMonth(newDate.getMonth())
              setYear(newDate.getFullYear())
            }}
            initialFocus
            components={{
              Caption: () => (
                <div className="flex justify-center py-2">
                  <Select value={months[month]} onValueChange={handleMonthChange}>
                    <SelectTrigger className="w-[140px] h-8 text-sm border-none p-0 mx-1">
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((monthName) => (
                        <SelectItem key={monthName} value={monthName}>
                          {monthName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={year.toString()} onValueChange={handleYearChange}>
                    <SelectTrigger className="w-[90px] h-8 text-sm border-none p-0 mx-1">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((yearNum) => (
                        <SelectItem key={yearNum} value={yearNum.toString()}>
                          {yearNum}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ),
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

