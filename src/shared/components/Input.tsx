import { type InputHTMLAttributes } from 'react'
import * as Label from '@radix-ui/react-label'
import { cn } from '../lib/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export const Input = ({ label, id, className, ...props }: InputProps) => {
  const inputId = id ?? props.name

  return (
    <div className="grid gap-2">
      {label ? (
        <Label.Root htmlFor={inputId} className="text-sm font-medium">
          {label}
        </Label.Root>
      ) : null}
      <input
        id={inputId}
        className={cn(
          'h-10 rounded-md border border-slate-800 bg-slate-950 px-3 text-sm text-slate-100 shadow-sm outline-none transition focus-visible:border-indigo-400',
          className,
        )}
        {...props}
      />
    </div>
  )
}
