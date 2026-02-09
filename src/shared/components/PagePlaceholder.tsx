type PagePlaceholderProps = {
  title: string
  description?: string
}

export const PagePlaceholder = ({
  title,
  description,
}: PagePlaceholderProps) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-8">
      <h1 className="text-2xl font-semibold text-slate-100">{title}</h1>
      {description ? (
        <p className="mt-2 text-sm text-slate-400">{description}</p>
      ) : null}
    </div>
  )
}
