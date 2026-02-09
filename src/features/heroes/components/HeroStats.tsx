import type { Hero } from '../types/hero.types'

type HeroStatsProps = {
  stats: Hero['stats']
}

const StatRow = ({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) => {
  return (
    <div className="grid gap-1">
      <div className="flex items-center justify-between">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-800">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

export const HeroStats = ({ stats }: HeroStatsProps) => {
  return (
    <div className="grid gap-2 text-xs text-slate-400">
      <StatRow label="Strength" value={stats.strength} color="bg-rose-400" />
      <StatRow label="Intelligence" value={stats.intelligence} color="bg-sky-400" />
      <StatRow label="Speed" value={stats.speed} color="bg-emerald-400" />
      <StatRow label="Durability" value={stats.durability} color="bg-violet-400" />
    </div>
  )
}
