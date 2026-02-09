import { NavLink, Outlet } from 'react-router-dom'

const links = [
  { to: '/heroes', label: 'Heroes' },
  { to: '/heroes/search', label: 'Buscar' },
]

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800">
        <nav className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-4">
          <span className="text-sm font-semibold tracking-wide text-slate-300">
            Heroes App
          </span>
          <div className="flex gap-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  [
                    'rounded-full px-3 py-1 text-sm transition',
                    isActive
                      ? 'bg-indigo-500 text-white'
                      : 'text-slate-300 hover:text-white',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}
