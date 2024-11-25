import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DynamicField as DynamicFieldType } from "@/types/expense";

interface DynamicFieldProps extends DynamicFieldType {
  onChange: (value: string) => void;
}

export function DynamicField({  
  label, 
  type, 
  required, 
  options, 
  value, 
  onChange 
}: DynamicFieldProps) {
  return (
    <FormItem>
      <FormLabel>{label}{required && ' *'}</FormLabel>
      <FormControl>
        {type === 'select' && options ? (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
          />
        )}
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}