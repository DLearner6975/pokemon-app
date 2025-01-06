import { Suspense } from 'react'
import ProjectDashboard from '@/components/project-dashboard'

async function fetchAllPokemon() {
  let allPokemon = []
  let url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'

  while (url) {
    const response = await fetch(url)
    const data = await response.json()
    allPokemon = [...allPokemon, ...data.results]
    url = data.next
  }

  return allPokemon
}

async function fetchPokemonDetails(pokemon) {
  const response = await fetch(pokemon.url)
  return response.json()
}

export default async function Page() {
  const allPokemon = await fetchAllPokemon()
  
  // Fetch details for the first 151 Pokemon (for performance reasons)
  const initialPokemonDetails = await Promise.all(
    allPokemon.slice(0, 151).map(fetchPokemonDetails)
  )

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectDashboard initialPokemon={initialPokemonDetails} allPokemon={allPokemon} />
    </Suspense>
  )
}

