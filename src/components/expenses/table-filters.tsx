"use client"

import * as React from "react"
import { SlidersHorizontal } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TableFiltersProps {
  onFilterChange: (filters: {
    dateRange?: {
      from: Date | undefined;
      to: Date | undefined;
    };
    status?: 'all' | 'pending' | 'approved' | 'rejected';
  }) => void;
}

export function TableFilters({ onFilterChange }: TableFiltersProps) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>()
  const [selectedStatus, setSelectedStatus] = React.useState<'all' | 'pending' | 'approved' | 'rejected'>('all')

  const handleFilterChange = (
    type: 'dateRange' | 'status',
    value: DateRange | 'all' | 'pending' | 'approved' | 'rejected'
  ) => {
    if (type === 'dateRange') {
      const range = value as DateRange;
      setDateRange(range);
      onFilterChange({
        dateRange: range ? {
          from: range.from,
          to: range.to
        } : undefined,
      });
    } else {
      const status = value as 'all' | 'pending' | 'approved' | 'rejected';
      setSelectedStatus(status);
      onFilterChange({
        status
      });
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-8 w-8 p-0">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Date Range</h4>
            <div className="rounded-md border">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={(range) => handleFilterChange('dateRange', range as DateRange)}
                numberOfMonths={1}
                disabled={(date) => date > new Date() || date < new Date('2000-01-01')}
              />
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Status</h4>
            <Select 
              value={selectedStatus}
              onValueChange={(value: 'all' | 'pending' | 'approved' | 'rejected') => 
                handleFilterChange('status', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}