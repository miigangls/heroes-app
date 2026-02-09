type ErrorStateProps = {
  title?: string
  description?: string
}

export const ErrorState = ({
  title = 'Ocurrio un error',
  description = 'No pudimos cargar la informacion.',
}: ErrorStateProps) => {
  return (
    <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-6">
      <h3 className="text-lg font-semibold text-red-200">{title}</h3>
      <p className="mt-2 text-sm text-red-200/80">{description}</p>
    </div>
  )
}
