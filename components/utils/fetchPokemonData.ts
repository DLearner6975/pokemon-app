import {
  formatPokemonData,
  formatEvolutionData,
  formatHeaderData,
} from './pokemon-data-formatter';

async function getPokemon(id: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

async function getSpecies(id: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch species data');
  }
  return res.json();
}

async function getEvolutionChain(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch evolution data');
  }
  return res.json();
}

async function getPokemonList() {
  // TODO: THERE IS DUPLICATE POKEMON DATA IN THE API, SO WE NEED TO GET ALL THE POKEMON DATA
  const res = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
  );
  if (!res.ok) {
    throw new Error('Failed to fetch pokemon list');
  }
  const data = await res.json();
  return data.results;
}

async function getTypeData(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch type data');
  }
  return res.json();
}

export async function fetchPokemonData(id: string) {
  const pokemon = await getPokemon(id);
  const species = await getSpecies(id);
  const evolutionChain = await getEvolutionChain(species.evolution_chain.url);
  const pokemonList = await getPokemonList();

  // Fetch damage relations for each type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const typePromises = pokemon.types.map((type: any) =>
    getTypeData(type.type.url)
  );
  const typeData = await Promise.all(typePromises);

  const formattedPokemon = await formatPokemonData(pokemon, species, typeData);
  const evolutions = formatEvolutionData(evolutionChain).map((evolution) => ({
    ...evolution,
    // image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${evolution.id}.svg`,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${evolution.id}.png`,
  }));

  const currentIndex = pokemonList.findIndex(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (p: any) => p.name === pokemon.name
  );
  const headerData = formatHeaderData(
    formattedPokemon,
    pokemonList,
    currentIndex
  );

  return {
    formattedPokemon,
    evolutions,
    headerData,
  };
}
