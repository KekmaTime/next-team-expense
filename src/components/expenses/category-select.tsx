"use client"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"
import { mockCategories } from "@/lib/mock-data"
import { ExpenseCategory } from "@/types/expense"

interface CategorySelectProps {
  value: string[]
  onChange: (value: string[]) => void
}

interface CategoryOption {
  value: string;
  label: string;
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  const [open, setOpen] = useState(false)
  
  const flattenCategories = (
    categories: ExpenseCategory[], 
    parentPath: string[] = []
  ): CategoryOption[] => {
    return categories.flatMap(category => {
      const currentPath = [...parentPath, category.name]
      const result = [{ 
        value: currentPath.join(" > "), 
        label: currentPath.join(" > ") 
      }]
      
      if (category.subcategories?.length) {
        return [...result, ...flattenCategories(category.subcategories, currentPath)]
      }
      
      return result
    })
  }

  const categories = flattenCategories(mockCategories)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value.length > 0 ? value.join(" > ") : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    const path = currentValue.split(" > ")
                    onChange(path)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.join(" > ") === category.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}