type PaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="rounded-md bg-slate-800 px-3 py-1 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>
      <p className="text-xs text-slate-400">
        Pagina {page} de {totalPages}
      </p>
      <button
        type="button"
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page >= totalPages}
        className="rounded-md bg-slate-800 px-3 py-1 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}
