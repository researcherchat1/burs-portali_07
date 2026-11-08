'use client'

import React from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Option = { value: string; label: string }

/** Radix boş dəyəri qəbul etmir. "Hamısı" ünvan query-sindən silinən seçimdir. */
const ALL = '__all__'

/** Yalnız Burslar və Kurslar filtrləri. Ünvanı çağıran səhifə yazır. */
export function FilterSelect(props: {
  label: string
  value: string
  options: Option[]
  onChange: (value: string) => void
}) {
  const options = props.options.filter((option) => option.value && option.value !== ALL)

  return (
    <label className="block text-left text-sm">
      <span className="mb-1 block text-muted-foreground">{props.label}</span>
      <Select
        value={props.value || ALL}
        onValueChange={(next) => props.onChange(next === ALL ? '' : next)}
      >
        <SelectTrigger className="h-10 border-[#c4568c] bg-background text-foreground shadow-none dark:border-[#c4568c]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-[#c4568c] bg-background text-foreground">
          <SelectItem value={ALL}>Hamısı</SelectItem>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  )
}
