'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{ title?: string }>()

  const title = data?.data?.title
  const number = data.rowNumber !== undefined ? data.rowNumber + 1 : ''

  return <div>{title ? `Sütun ${number}: ${title}` : 'Sütun'}</div>
}
