# Heroes App

Aplicacion web para explorar heroes y villanos, gestionar favoritos y realizar busquedas por nombre y fuerza. Construida con React, TypeScript y Vite.

## Caracteristicas

- Listado de heroes con paginacion.
- Filtros por categoria (heroes, villanos, favoritos).
- Busqueda por nombre y fuerza minima.
- Favoritos persistidos en el navegador.
- Vista de detalle (placeholder listo para completar).
- UI limpia con Tailwind CSS y componentes compartidos.

## Capturas

Puedes agregar capturas en la carpeta `public/` y referenciarlas aqui.

## Stack

- React 19 + TypeScript
- Vite
- React Router
- TanStack Query
- Tailwind CSS
- MSW (seed local para datos auxiliares)

## Requisitos

- Node.js 18+ recomendado
- pnpm o yarn

## Instalacion

```bash
pnpm install
```

O con yarn:

```bash
yarn
```

## Desarrollo

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Preview

```bash
pnpm preview
```

## Scripts

- `dev`: servidor de desarrollo
- `build`: build de produccion
- `preview`: vista previa del build
- `lint`: linting

## Rutas

- `/heroes`: listado principal
- `/heroes/search`: pagina de busqueda
- `/heroes/:heroId`: detalle de heroe (placeholder)

## Datos y API

La aplicacion consume el backend publico:

- Base API: `https://heroes-app-backend.onrender.com/api/heroes`
- Imagenes: `https://heroes-app-backend.onrender.com/images`

La busqueda usa el endpoint `/search` con parametros `name` y `strength`.

## Arquitectura

Estructura principal de `src/`:

- `app/`: layout raiz y providers
- `features/`: modulos por dominio (heroes, auth, admin)
- `router/`: rutas de la app
- `shared/`: UI compartida y utilidades

## Notas

- Favoritos se guardan en `localStorage`.
- Si no hay resultados de busqueda, se muestra un estado vacio.

## Licencia

Uso libre para fines educativos y personales.
