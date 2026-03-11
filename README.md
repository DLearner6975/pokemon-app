This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Technologies Used

This project uses the following technologies:

### Core Technologies

- [Next.js 15](https://nextjs.org/) - React framework with server-side rendering and routing
- [React 19](https://react.dev/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript superset

### UI and Styling

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components built with Radix UI and Tailwind
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI components
- [Lucide Icons](https://lucide.dev/) - Icon library
- [Class Variance Authority](https://cva.style/docs) - For creating variant components
- [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) - Animation utilities for Tailwind

### UI Components and Features

- [Embla Carousel](https://www.embla-carousel.com/) - Carousel/slider component
- [tsParticles](https://particles.js.org/) - Particle animations library

### Development Tools

- [ESLint](https://eslint.org/) - JavaScript linter
- [PostCSS](https://postcss.org/) - CSS transformation tool
- [Turbopack](https://turbo.build/pack) - Incremental bundler (used in development)

### Data Source

- [PokéAPI](https://pokeapi.co/) - RESTful API used to retrieve comprehensive Pokémon data including:
  - Pokémon information (stats, abilities, types)
  - Species details
  - Evolution chains
  - Type effectiveness
  - Images via the [PokeAPI/sprites](https://github.com/PokeAPI/sprites) repository

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Contributing

Use the GitHub issue templates for bugs and feature requests, and follow the PR process described in [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
