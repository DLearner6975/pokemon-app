# Pokemon App

A production-style Pokemon explorer built with `Next.js 15`, `React 19`, and `TypeScript`.

This project started as a UI-focused Pokemon app and has evolved into a stronger architecture exercise that demonstrates how to design a scalable data layer on top of a third-party API. The app fetches, normalizes, caches, and indexes Pokemon data from `PokeAPI`, then exposes that data through a reducer-driven store and reusable hooks for filtering, pagination, and detail views.

## Why I Built This

I built this project to strengthen the skills that matter in modern frontend roles: building polished user experiences, designing maintainable application architecture, and working confidently with real external data sources. Rather than keeping the app as a simple demo, I used it to practice production-minded decisions such as server-side data bootstrapping, normalized state, reusable selectors, and deployment-ready structure.

## Project Goals

- Build a polished, responsive Pokemon browsing experience.
- Practice modern `Next.js App Router` patterns with a clear server/client boundary.
- Model external API data into a typed, reusable domain layer.
- Improve performance with caching, normalization, indexing, and controlled concurrency.
- Structure the app so the UI stays thin while data logic remains maintainable and testable.

## Key Features

- Browse a large Pokemon catalog with search, filtering, and pagination.
- Filter by multiple dimensions including type, generation, habitat, shape, color, legendary, and mythical.
- View detail pages with richer Pokemon information, evolution data, and related metadata.
- Use shareable URL-based search and filter state for a better user experience.
- Interact with a responsive layout that separates filtering, browsing, and detail exploration cleanly.
- Load data through a server-first architecture that prepares the catalog before the client UI hydrates.

## What This Project Demonstrates

- `Next.js App Router` architecture with server-rendered entrypoints and client-side interactive state.
- `TypeScript` domain modeling for normalized Pokemon entities, filter state, indexes, and selectors.
- Third-party API integration using `PokeAPI` for catalog, species, evolution, and type data.
- Server-side caching and revalidation using `next/cache` and `fetch` revalidation options.
- Reducer-based state management with custom hooks instead of page-local orchestration.
- Indexed filtering and derived selectors for scalable search, filtering, and pagination.
- URL-synced filter state for shareable search results and predictable navigation.
- Responsive UI composition with reusable components and accessible primitives.

## Architecture Highlights

### 1. Server-side catalog bootstrap

The list route loads an initial Pokemon catalog on the server before hydrating the client provider. This keeps page-level orchestration thin and gives the UI a ready-to-use initial state.

### 2. Normalized data model

Pokemon data is transformed from raw API responses into a consistent internal entity shape. That allows the app to work with stable, typed records instead of repeatedly mapping nested API payloads in the UI layer.

### 3. Indexed filtering

The app precomputes filter indexes for dimensions such as type, generation, habitat, shape, color, legendary, and mythical. That reduces repeated full-list scans and makes multi-filter combinations more efficient.

### 4. Reducer-driven store

Search, filters, pagination, and catalog state are managed through a reducer-backed store exposed by custom hooks. This improves predictability, keeps business logic centralized, and makes components easier to reason about.

### 5. URL synchronization

Search and filter state are serialized into the URL so results are shareable and browser navigation stays intuitive.

### 6. Performance-aware API aggregation

The app gathers a large Pokemon catalog from multiple `PokeAPI` endpoints, uses controlled concurrency during fetch orchestration, and caches the normalized result for reuse.

## Skills Applied

- Frontend architecture
- React state management
- Server and client component composition
- API aggregation and transformation
- Data normalization
- Performance optimization
- TypeScript modeling
- Responsive UI development
- Reusable hooks and selectors
- Clean separation of concerns

## Tech Stack

### Core

- [Next.js 15](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)

### Styling and UI

- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)
- [Class Variance Authority](https://cva.style/docs)
- [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)

### Features and Visuals

- [Embla Carousel](https://www.embla-carousel.com/)
- [tsParticles](https://particles.js.org/)

### Tooling

- [ESLint](https://eslint.org/)
- [PostCSS](https://postcss.org/)
- [Turbopack](https://turbo.build/pack)

### Data Source

- [PokéAPI](https://pokeapi.co/)

## Example Engineering Challenges Solved

- Converting raw API responses into a normalized catalog shape suitable for UI consumption.
- Coordinating list, species, evolution, and type data across multiple endpoints.
- Avoiding inaccurate filter results by loading the right filterable metadata up front.
- Keeping search and filter state in sync with the URL.
- Supporting a richer UI without letting presentational components own data orchestration.

## Project Structure

```text
app/
  page.tsx
  pokemon/[id]/page.tsx
components/
  providers/
  ui/
lib/
  pokemon/
    api/
    hooks/
    model/
    server/
    state/
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
```

## Deployment

This project is structured to be deployment-ready and works well as a portfolio example because it demonstrates more than local UI work. It shows how a `Next.js` application can fetch third-party data on the server, cache results, and ship an interactive client experience in a production-style setup.

### Deployment Notes

- Best fit: `Vercel` for native `Next.js` deployment support.
- Production build command: `pnpm build`
- Production start command: `pnpm start`
- External data source: `PokeAPI`
- Server caching: `fetch` revalidation plus `next/cache`

### Why Deployment Matters Here

- It demonstrates that the app is not just coded locally, but prepared for a real hosted environment.
- It shows experience with production builds, server rendering, caching, and runtime behavior.
- It gives recruiters and employers a live project they can review without cloning the repository.

### Recommended Portfolio Additions

When you have them available, add these links near the top of this README:

- [Live demo URL](https://pokemon-app-nine-amber.vercel.app/)
- [GitHub repository URL](https://github.com/DLearner6975/pokemon-app)
- Screenshots or a short demo walkthrough

## Contributing

For issue intake, pull request expectations, and CI requirements, see [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Future Improvements

- Add targeted unit tests for selectors, reducers, and normalization utilities.
- Add integration coverage for list filtering and URL hydration flows.
- Improve loading, error, and observability patterns around third-party API failures.
- Consider virtualization if rendered list size becomes the primary bottleneck.
