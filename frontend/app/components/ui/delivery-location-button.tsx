import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select"
import { CR } from 'country-flag-icons/react/3x2'

export function DeliveryLocationButton() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Countries</SelectLabel>
        </SelectGroup>
          <SelectItem value="cr">Costa Rica</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default DeliveryLocationButton