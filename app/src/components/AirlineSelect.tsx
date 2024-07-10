'use client'

import * as React from "react"

import { useQuery } from '@tinybirdco/charts'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AirlineSelect({ airline, token, dateParams, onChange }: 
  { airline: string, token: string, onChange: (value: string) => void })

  {  
    const { data, error, loading } = useQuery({
    endpoint: 'https://api.tinybird.co/v0/pipes/airline_list.json',
    params: {token, dateParams}
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Select
      value={airline}
      onValueChange={(value) => {
        onChange(value)
      }}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select an airline" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {data.map(item => (
            <SelectItem key={item.c} value={item.airline}>{item.airline}</SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
 }
