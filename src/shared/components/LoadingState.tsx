type LoadingStateProps = {
  title?: string
  description?: string
}

export const LoadingState = ({
  title = 'Cargando',
  description = 'Estamos preparando la informacion.',
}: LoadingStateProps) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-8">
      <div className="h-5 w-40 animate-pulse rounded bg-slate-800" />
      <div className="mt-3 h-4 w-64 animate-pulse rounded bg-slate-800" />
      <p className="mt-4 text-sm text-slate-500">
        {title} - {description}
      </p>
    </div>
  )
}
