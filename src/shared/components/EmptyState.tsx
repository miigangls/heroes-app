type EmptyStateProps = {
  title?: string
  description?: string
}

export const EmptyState = ({
  title = 'Sin resultados',
  description = 'No encontramos heroes para mostrar.',
}: EmptyStateProps) => {
  return (
    <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center">
      <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  )
}
