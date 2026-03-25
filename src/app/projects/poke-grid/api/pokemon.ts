import { Pokemon, PokemonListItem } from "../types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

interface RawPokemonListItem {
  name: string;
  url: string;
}

async function getAllPokemon(): Promise<PokemonListItem[]> {
  const res = await fetch(`${BASE_URL}?limit=10000`);

  if (!res.ok) {
    throw new Error(`Failed to fetch pokemon list: ${res.status}`);
  }

  const data = await res.json();

  return data.results.map((pokemon: RawPokemonListItem) => {
    const id = pokemon.url.split('/')[6];
    return {
      ...pokemon,
      id,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  });
}

async function getPokemon(url: string): Promise<Pokemon> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error (`Failed to fetch pokemon: ${res.status}`)
  }
  return res.json() as Promise<Pokemon>;
}

export {
  getAllPokemon,
  getPokemon,
}
