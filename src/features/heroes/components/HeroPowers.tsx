type HeroPowersProps = {
  powers: string[]
}

export const HeroPowers = ({ powers }: HeroPowersProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {powers.slice(0, 3).map((power) => (
        <span
          key={power}
          className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200"
        >
          {power}
        </span>
      ))}
      {powers.length > 3 ? (
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">
          +{powers.length - 3} more
        </span>
      ) : null}
    </div>
  )
}
